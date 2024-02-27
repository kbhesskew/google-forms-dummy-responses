// Replace 'YOUR_FORM_ID' with the actual Form ID
var formId = '13XSNBJeIf1_2_-igFz8316fCwqlApY78nLhjIrbwK5g';

function submitFormResponse() {
  var form = FormApp.openById(formId);

  // Loop 400 times
  for (var submissionCount = 1; submissionCount <= 7; submissionCount++) {
    var formResponse = form.createResponse();

    // Generate random answers for each question
    var answers = [
      getRandomResponseWithOptions([
        { value: "Yes", percentage: 99 },
        { value: "No", percentage: 1 },
      ]), // Did you attend Turkey Trails and Thanks?
      getRandomResponseWithOptions([
        { value: "Yes", percentage: 78 },
        { value: "No", percentage: 22 },
      ]), // Did you register for the Turkey Trot portion of the program?
      getRandomResponseWithOptions([
        { value: "Yes", percentage: 72 },
        { value: "No", percentage: 28 },
      ]), // Did you participate in the Turkey Trot portion of the program?
      getRandomResponseWithOptions([
        { value: "1", percentage: 5 },
        { value: "2", percentage: 9 },
        { value: "3", percentage: 20 },
        { value: "4", percentage: 35 },
        { value: "5", percentage: 31 },
      ]), // On a scale from 1-5, how much do you feel like you connected with the people around you from your community?
      getRandomResponseWithOptions([
        { value: "1", percentage: 3 },
        { value: "2", percentage: 5 },
        { value: "3", percentage: 21 },
        { value: "4", percentage: 39 },
        { value: "5", percentage: 32 },
      ]), // On a scale from 1-5, how would you rate your enjoyment of this program?
      getRandomResponseWithOptions([
        { value: "1", percentage: 13 },
        { value: "2", percentage: 14 },
        { value: "3", percentage: 32 },
        { value: "4", percentage: 18 },
        { value: "5", percentage: 23 },
      ]), // On a scale from 1-5, how likely are you to come back to Tijuana River Valley Park?
      getRandomResponseWithOptions([
        { value: "Turkey Trot", percentage: 25 },
        { value: "Educational Workshops", percentage: 12 },
        { value: "Community Share Time", percentage: 17 },
        { value: "Community Potluck", percentage: 18 },
        { value: "Live Music Brought by Band Hot Pursuit", percentage: 20 },
        { value: "Other", percentage: 8 },
      ]), // What was your favorite aspect of this program?
      getRandomComments(), // If this event takes place next year, what areas would you most like to see improvement in?
      getRandomComments() // Are there any activities we should add for future events?
    ];

    // Iterate through form items and add responses
    var items = form.getItems();
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      var answer = answers[i];

      addResponseToFormItem(formResponse, item, answer);
    }

    // Submit the form response
    formResponse.submit();

    // Pause for a short time to avoid rate limits
    Utilities.sleep(1000); // Sleep for 1 second (1000 milliseconds)
  }
}

// Helper function to add a response to a form item
function addResponseToFormItem(formResponse, item, response) {
  if (item) {
    try {
      switch (item.getType()) {
        case FormApp.ItemType.MULTIPLE_CHOICE:
          formResponse.withItemResponse(item.asMultipleChoiceItem().createResponse(response));
          break;
        case FormApp.ItemType.CHECKBOX:
          formResponse.withItemResponse(item.asCheckboxItem().createResponse([response])); // Assuming checkboxes are arrays
          break;
        case FormApp.ItemType.TEXT:
          formResponse.withItemResponse(item.asTextItem().createResponse(response));
          break;
        case FormApp.ItemType.PARAGRAPH_TEXT:
          formResponse.withItemResponse(item.asParagraphTextItem().createResponse(response));
          break;
        case FormApp.ItemType.LIST:
          formResponse.withItemResponse(item.asListItem().createResponse(response));
          break;
        case FormApp.ItemType.GRID:
          formResponse.withItemResponse(item.asGridItem().createResponse([response])); // Assuming grid items are arrays
          break;
        case FormApp.ItemType.SCALE:
          formResponse.withItemResponse(item.asScaleItem().createResponse(response));
          break;
        default:
          console.warn('Unsupported item type:', item.getType());
          break;
      }
    } catch (error) {
      console.error('Error processing item:', item.getTitle(), 'Error:', error.toString());
    }
  } else {
    console.error('Item is undefined or null.');
  }
}

// Function to generate random responses from a given set of options
function getRandomResponseWithOptions(options) {
  var total = options.reduce((sum, option) => sum + option.percentage, 0);
  var randomNumber = Math.random() * total;
  var cumulativePercentage = 0;

  for (var i = 0; i < options.length; i++) {
    cumulativePercentage += options[i].percentage;
    if (randomNumber < cumulativePercentage) {
      return options[i].value;
    }
  }

  // Default to the first option if something goes wrong
  return options[0].value;
}

// Function to generate random comments for the last two columns
function getRandomComments() {
  var comments = [
    "The event was great!",
    "I enjoyed the Turkey Trot.",
    "More workshops next time!",
    "The potluck was fantastic.",
    "The live music made my day.",
    "Looking forward to future events."
  ];

  var randomIndex = Math.floor(Math.random() * comments.length);
  return comments[randomIndex];
}

// Run the script
submitFormResponse();
