import spacer from './graphix/besterdev_spacer_white.png'

const ColouredBox = (props) => {
  const fn = props.fn;
  const ln = props.ln;
  const age = props.age;
  const gender = props.gender;
  const jd = props.jd;
  const state = props.state;
  const country = props.country;
  const skill1 = props.skill1;
  const skill2 = props.skill2;
  const skill3 = props.skill3;
  const mobile = props.mobile;
  const email = props.email;
  const boxStyle = {
    backgroundColor: '#f7f4f3',
    height: '70px',
    border: '2px solid #336791',
    borderRadius: '3px',
    padding: 0,
    paddingLeft: '20px',
    width: '95%',
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    left: "20px",
  };

  return (
    <div style={boxStyle}>
      <span>
        {fn} {ln} is a {age} year old {gender} with a Job Description of {jd}, whom currently resides in {state}, {country} with primary skills of {skill1} and {skill2} and {skill3} whom can be reached at {mobile} or {email};
      </span>
    </div>
  );
};

export default ColouredBox;