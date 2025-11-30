
  // -------------------------------------------------------
  // CHATBOT's
  // -------------------------------------------------------

  const handleSubmitChatbot = async (e) => {
    e.preventDefault();
    if (!entry.trim()) return;
    setLoading(true);
    try {
      const createRes = await fetch(API_BASE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userInput: entry,
          botResponse: "",
          botCorrection: "",
          grammarScore: 0,
          vocabularyScore: 0,
          spellingScore: 0,
          comprehensibilityScore: 0,
          wordorderScore: 0,
        }),
      });

      if (!createRes.ok) throw new Error("Failed to create record");
      const saved = await createRes.json();
      const savedId = saved.id;

      const aiPrompt = {
        question: `You are a Dutch language teacher + scorer. The scoring is 0, 1 and 2. 0 = wrong or poor. 1 = acceptable. 2 = perfect. A student wrote: "${entry}". 
Respond in JSON with:
- grammarScore (0-2)
- vocabularyScore (0-2)
- spellingScore (0-2)
- comprehensibilityScore (0-2)
- wordorderScore (0-2)
- botCorrection
- botResponse (conversational about the topic, not linguistic feedback, always in Dutch, encourage responses to be in the future tense or past tense)`
      };

      const aiRes = await fetch(AI_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(aiPrompt),
      });

      let aiData = await aiRes.json();
      let aiText = aiData.answer || aiData.response || JSON.stringify(aiData);
      aiText = aiText.replace(/^Optional\[/, "").replace(/\]$/, "").replace(/```json|```/g, "").trim();

      let parsed = {};
      try {
        parsed = typeof aiData === "object" && aiData !== null && aiData.grammarScore !== undefined
          ? aiData
          : JSON.parse(aiText);
      } catch {
        parsed = {
          grammarScore: 0,
          vocabularyScore: 0,
          spellingScore: 0,
          comprehensibilityScore: 0,
          wordorderScore: 0,
          botCorrection: "",
          botResponse: String(aiText),
        };
      }

      const sanitizeScore = (v) => Math.max(0, Math.min(5, Math.round(Number(v) || 0)));

      const updatePayload = {
        userInput: entry,
        botResponse: parsed.botResponse || parsed.response || parsed.botReply || "",
        botCorrection: parsed.botCorrection || parsed.suggestedSentence || "",
        grammarScore: sanitizeScore(parsed.grammarScore),
        vocabularyScore: sanitizeScore(parsed.vocabularyScore),
        spellingScore: sanitizeScore(parsed.spellingScore),
        comprehensibilityScore: sanitizeScore(parsed.comprehensibilityScore),
        wordorderScore: sanitizeScore(parsed.wordorderScore),
      };

      const updateRes = await fetch(`${API_BASE}/${savedId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatePayload),
      });

      if (!updateRes.ok) toast.error("Could not persist AI results to DB", { position: "top-center" });

      setRecentData({
        id: savedId,
        ...updatePayload,
        createdAtParsed: saved.createdAt ? parseCreatedAt(saved.createdAt) : new Date(),
      });
      setEntry("");
      fetchAllEntries();
    } catch (err) {
      console.error(err);
      toast.error("Er is een fout opgetreden.", { position: "top-center" });
    } finally {
      setLoading(false);
    }
  };





  // -------------------------------------------------------
  // SCHRIJVENTOETS'
  // -------------------------------------------------------


    // -------------------------------
    // Submit answer for AI evaluation
    // -------------------------------
    const checkAnswer = async (e) => {
      e.preventDefault();
      if (!userInput.trim()) return setFeedback("⚠️ Please enter a response.");
      if (!challenge) return setFeedback("⚠️ Load a challenge first.");
  
      setLoading(true);
      setFeedback("Evaluating...");
      setCriteriaScores(null);
  
      try {
        const payload = {
          question: `
  You are a Dutch NT2/B2 writing examiner and language teacher.
  
  Evaluate this student's written response to the following exam question:
  "${challenge.questionVerbiage}"
  
  Student's response:
  "${userInput}"
  
  Return valid JSON only (no explanations outside JSON). 
  Include an additional "suggested_correction" field that shows a corrected, natural, and grammatically accurate version of the student's text in Dutch.
  
  Format your answer strictly like this:
  {
    "criteria": {
      "Begrijpelijkheid": {"evaluation": 1-5, "comment": "feedback"},
      "Grammatica": {"evaluation": 1-5, "comment": "feedback"},
      "BegrijpelijkheidAlgemeen": {"evaluation": 1-5, "comment": "feedback"},
      "GrammaticaAlgemeen": {"evaluation": 1-5, "comment": "feedback"}
    },
    "suggested_correction": "..."
  }
          `,
        };
  
        const res = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
  
        const data = await res.json();
        const aiResponse = data.answer || "";
        const parsed = safeJsonParse(aiResponse);
  
        if (parsed && parsed.criteria) {
          setCriteriaScores(parsed);
          setFeedback("");
          console.log("In <SchrijvenToet/> is jou criteriaScores: " + JSON.stringify(parsed, null, 2));
          if (challenge?.id) {
            await saveFeedbackToDB(parsed, challenge.id);
          }
  
        } else {
          setFeedback("⚠️ Evaluation complete — but structured data missing.");
          setCriteriaScores({ rawResponse: aiResponse });
        }
      } catch (err) {
        console.error("❌ Evaluation error:", err);
        setFeedback("❌ Error evaluating your response.");
      } finally {
        setLoading(false);
      }
    };
  
    // -------------------------------
    // Persist AI feedback to DB
    // -------------------------------
    const handleSubmitSchrijven = async (parsed, id) => {
      if (!parsed || !id) return;
  
      // Map AI feedback into entity structure
      const updatedEntity = {
        ...challenge, // existing fields from the loaded question
        studentResponse: userInput,
  
        feedbackBegrijpelijkheid: parsed.criteria.Begrijpelijkheid.comment,
        feedbackBegrijpelijkheidScore: parsed.criteria.Begrijpelijkheid.evaluation,
  
        feedbackGrammatica: parsed.criteria.Grammatica.comment,
        feedbackGrammaticaScore: parsed.criteria.Grammatica.evaluation,
  
        feedbackBegrijpelijkheidAlgemeen: parsed.criteria.BegrijpelijkheidAlgemeen.comment,
        feedbackBegrijpelijkheidAlgemeenScore: parsed.criteria.BegrijpelijkheidAlgemeen.evaluation,
  
        feedbackGrammaticaAlgemeen: parsed.criteria.GrammaticaAlgemeen.comment,
        feedbackGrammaticaAlgemeenScore: parsed.criteria.GrammaticaAlgemeen.evaluation,
  
        suggestedCorrection: parsed.suggested_correction,
      };
  
      try {
        const res = await fetch(
          `https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/nt2exam/schrijven/put/${id}`,
          // `http://localhost:8000/api/v1/nt2exam/schrijven/put/${id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedEntity),
          }
        );
  
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const saved = await res.json();
        console.log("✅ Successfully persisted feedback:", saved);
      } catch (err) {
        console.error("❌ Error saving feedback:", err);
      }
    };
  
    useEffect(() => {
      let timer;
      if (challenge) {
        setSecondsElapsed(0); // reset when a new question is loaded
        timer = setInterval(() => {
          setSecondsElapsed((prev) => prev + 1);
        }, 1000);
      }
      return () => clearInterval(timer); // cleanup when question changes or component unmounts
    }, [challenge]);



  // -------------------------------------------------------
  // DAGBOEK'S
  // -------------------------------------------------------

    const handleSubmitDiary = async (e) => {
        e.preventDefault();
        if (!entry.trim()) return;

        setLoading(true); setFeedback(""); setAiSentence(""); setRecentData(null);

        try {
            // Save user entry
            const postRes = await fetch(API_BASE, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ myEntry: entry, aiEntry: "", feedback: "" })
            });
            const saved = await postRes.json();
            const savedId = saved.id;

            // AI request
            const aiRes = await fetch(AI_ENDPOINT, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    question: `
                    You are a Dutch language teacher. A student wrote: "${entry}". Please respond ONLY in raw JSON with keys "feedback" and "suggestedSentence" and "score".
                    Scoring rules:
                    5 = Excellent, no or tiny mistakes
                    4 = Good, minor issues
                    3 = Understandable but several mistakes
                    2 = Many mistakes, meaning partly unclear
                    1 = Major errors, meaning unclear
                    0 = Completely incorrect or unrelated`
                })
            });

            let aiData = await aiRes.json();
            let aiText = aiData.answer || aiData.response || "";
            aiText = aiText.replace(/^Optional\[/, "").replace(/\]$/, "").replace(/```json|```/g, "").trim();

            let parsedFeedback = "";
            let parsedSentence = "";
            let parsedScore = 1; // minimum 1

            try {
                const parsed = JSON.parse(aiText);
                parsedFeedback = parsed.feedback || "";
                parsedSentence = parsed.suggestedSentence || "";
                parsedScore = parsed.score ?? 1;
                parsedScore = Math.max(1, Math.min(5, parsedScore)); // clamp 1-5
            } catch { parsedFeedback = aiText; parsedScore = 1; }

            // Update UI
            setFeedback(parsedFeedback);
            setAiSentence(parsedSentence);
            setRecentData({ entry, feedback: parsedFeedback, aiSentence: parsedSentence, score: parsedScore });
            resetTimer();

            // Update backend entry
            await fetch(`${API_BASE}/${savedId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ feedback: parsedFeedback, aiEntry: parsedSentence, score: parsedScore })
            });

            setEntry(""); setWordCount(0); fetchAllEntries();
        } catch (err) {
            console.error(err); setFeedback("Er is een fout opgetreden.");
        } finally { setLoading(false); }
    };


  // -------------------------------------------------------
  // COMMON CODE AMONGST ALL THREE:
  // -------------------------------------------------------