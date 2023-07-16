useEffect(() => {
    axios('https://randomuser.me/api/')
      .then((response) => {
        setCandidatedata(response.data.results);
      })
  },
    []);