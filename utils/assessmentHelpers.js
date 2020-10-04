exports.sumAssessmentScore = (arr) => {
  return arr.reduce((total, score) => total + Number(score), 0);
};

exports.phqLevel = (score) => {
  if (score < 5) {
    return "None/Minimal";
  } else if (score >= 5 && score <= 9) {
    return "Mild";
  } else if (score >= 10 && scores <= 14) {
    return "Moderate";
  } else if (score >= 15 && score <= 19) {
    return "Moderately Severe";
  } else if (score >= 20 && score <= 27) {
    return "Severe";
  }
};

exports.phqResult = (score) => {
  if (score < 5) {
    return "Your score falls in the none to minimal category in regards to depression severity. It should be noted that a clinician would most likely decide that you may not need depression treatment.";
  } else if (score >= 5 && score <= 9) {
    return "Your score falls in the mild category in regards to depression severity. It should be noted that a clinician would use clinical judgement about treatment based on your duration of symptoms and functional impairment.";
  } else if (score >= 10 && score <= 14) {
    return "Your score falls in the moderate category in regards to depression severity. It should be noted that a clinician would use clinical judgement about treatment based on your duration of symptoms and functional impairment.";
  } else if (score >= 15 && score <= 19) {
    return "Your score falls in the moderately severe category in regards to depression severity. It should be noted that a clinician would treat you using antidepressants, psychotherapy or a combination of treatment. It is advised that you meet with a clinician.";
  } else if (score >= 20 && score <= 27) {
    return "Your score falls in the severe category in regards to depression severity. It should be noted that a clinician would treat you using antidepressants with or without psychotherapy. It is strongly advised that you meet with a clinician.";
  }
};

exports.gadLevel = (score) => {
  if (score < 5) {
    return "None/Minimal";
  } else if (score >= 5 && score <= 9) {
    return "Mild";
  } else if (score >= 10 && score <= 14) {
    return "Moderate";
  } else if (score >= 15) {
    return "Severe";
  }
};

exports.gadResult = (score) => {
  if (score < 5) {
    return "Your score falls in the none to minimal anxiety category. It should be noted that a clinician would most likely decide that you may not need anxiety treatment. Functionally, you do not report limitations due to your symptoms.";
  } else if (score >= 5 && score <= 9) {
    return "Your score falls in the mild anxiety category. It should be noted that a clinician would most likely further monitor you before taking action. Functionally, you may occasionally find it somewhat difficult to perform life tasks due to your symptoms.";
  } else if (score >= 10 && score <= 14) {
    return "Your score falls in the moderate anxiety category. It should be noted that a clinician would require further assesments including a diagnostic interview and mental status exmaination as well as a referral to a mental health professional would be recommended. Functionally, you may find it very difficult to perform life tasks due to your symptoms.";
  } else if (score >= 15) {
    return "Your score falls in the severe anxiety category. It should be noted that a clinician would most likely have active treatment warranted. Functionally, you may find it extremely difficult to perform life tasks due to your symptoms.";
  }
};
