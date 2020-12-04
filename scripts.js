let projectToDisplay = 1;
const numberOfProjects = 4;

// EVENT BEHAVIOUR

$(document).ready(() => {
  // NAVBAR

  // Collpased navbar behaviour
  let menuClosed = true;
  $(".navbar__toggler-icon").on("click", (e) => {
    if (menuClosed) {
      $("#menu__icon").removeClass("bounce");
      setTimeout(() => {
        $("#menu__icon").addClass("rotate");
      }, 30);
      $(".navbar__collapsed-content").css("max-height", "16rem");
      menuClosed = false;
    } else {
      $("#menu__icon").addClass("bounce");
      $("#menu__icon").removeClass("rotate");
      $(".navbar__collapsed-content").css("max-height", "2rem");
      menuClosed = true;
    }
  });

  // Closes menu when menu item is clicked
  $(".navbar__item").on("click", (e) => {
      $("#menu__icon").addClass("bounce");
      $("#menu__icon").removeClass("rotate");
      $(".navbar__collapsed-content").css("max-height", "2rem");
      menuClosed = true;
  });


  // ShowRoom behaviour
  // prev click
  $("#prev__showroom").on("click", () => {
    if (projectToDisplay > 1) {
      projectToDisplay--;
    } else {
      projectToDisplay = numberOfProjects;
    }
    $(".center").addClass("slide-in-left");
    displayBg(projectToDisplay);
    displayDiv(projectToDisplay);
    setTimeout(() => {
      $(".center").removeClass("slide-in-left");
      $(".center").removeClass("slide-in-right");
    }, 400);
  });

  // next click
  $("#next__showroom").on("click", () => {
    if (projectToDisplay < numberOfProjects) {
      projectToDisplay++;
    } else {
      projectToDisplay = 1;
    }
    $(".center").addClass("slide-in-right");
    displayBg(projectToDisplay);
    displayDiv(projectToDisplay);
    setTimeout(() => {
      $(".center").removeClass("slide-in-left");
      $(".center").removeClass("slide-in-right");
    }, 400);
  });

  // background
  function displayBg(number) {
    $("#showroom").removeClass();
    $("#showroom").addClass(createClassId(number));
  }
    // Div
  function displayDiv(number) {
    let projectId = `#${createClassId(number)}`;
    $(".project").removeClass("showroom__active");
    $(projectId).addClass("showroom__active");
  }

  function createClassId(number) {
    return (classIdOfProjectToDisplay = "project" + number);
  }
});
