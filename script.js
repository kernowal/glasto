$(document).ready(function() {
  // Define order of lists you want to prioritise
  var order = [3,4,2,1]
  
  // Get json object from db storage
  const groups = [
    {
        "group": "1",
        "order_status": "Bought",
        "reg": ["123456789", "2", "3", "4"],
        "code": ["A11AA", "2", "3", "4"]
    },
    {
        "group": "2",
        "order_status": "None",
        "reg": ["987654321"],
        "code": ["B22BB"]
    },
    {
        "group": "3",
        "order_status": "Buying",
        "reg": ["555555555"],
        "code": ["C33CC"]
    },
    {
        "group": "4",
        "order_status": "None",
        "reg": ["111111111", "2"],
        "code": ["D44DD", "D4d"]
    }
  ];
  
  // Filter out status != None 
  const filteredGroups = groups.filter(group => group.order_status == "None");

  // Order by group_id
  filteredGroups.sort((a, b) => {
      const indexA = order.indexOf(parseInt(a.group));
      const indexB = order.indexOf(parseInt(b.group));
      return indexA - indexB;
  });

  // Get arrays
  var regArray = filteredGroups[0].reg
  var codeArray = filteredGroups[0].code
  console.log("Inputting data for group", filteredGroups[0].group, "using", regArray, codeArray)
  
  // Find input fields with properties containing "reg" or "code" and populate them
  var regInputs = [];
  var codeInputs = [];
  var populated = [];
  
  // Loop through all input elements and filter those with properties containing "reg" or "code"
  $("input").each(function(index) {
      var $input = $(this);
      var hasMatch = false;
      console.log(populated)

      $.each(this.attributes, function() {
        if (hasMatch == false && !populated.includes($input[0].id)) {
          if (this.value.includes("reg")) {
              regInputs.push($input);
              hasMatch = true;
          } else if (this.value.includes("code")) {
              codeInputs.push($input);
              hasMatch = true;
          }
        }
        
        // Only include unique elements in the arrays
        if (hasMatch) {
            populated.push($input[0].id)
            return false; // Exit the loop after the first match
        }
      });
  });

  // Populate the "reg" inputs with data from regArray
  $.each(regInputs, function(index, $input) {
      if (index < regArray.length) {
          console.log($input)
          $input.val(regArray[index]);
      }
  });

  // Populate the "code" inputs with data from codeArray
  $.each(codeInputs, function(index, $input) {
      if (index < codeArray.length) {
          $input.val(codeArray[index]);
      }
  });
  console.log("Autofill script ran")
});
