let projectToDisplay = 1;
const numberOfProjects = 3;

// EVENT BEHAVIOUR

$(document).ready(() => {
  // NAVBAR

  // Collpased navbar behaviour
  let menuClosed = true;
  $(".navbar__toggler-icon").on("click", (e) => {
    if (menuClosed) {
      $("#menu__icon").addClass("rotate");
      $("#menu__icon").css("background-color", "white");
      $(".navbar__menu").css("max-height", "16rem");
      menuClosed = false;
    } else {
      $("#menu__icon").removeClass("rotate");
      $("#menu__icon").css("background-color", "");
      $(".navbar__menu").css("max-height", "3rem");
      menuClosed = true;
    }
  });

  // Remove behaviour when navbar is not collapsed anymore
  $(".navbar__item").on("click", (e) => {
      $("#menu__icon").removeClass("rotate");
      $("#menu__icon").css("background-color", "");
      $(".navbar__menu").css("max-height", "3rem");
      menuClosed = true;
  });

  // SHOWROOM
  const breakPoint = 550; /* This value has to be the same as CSS media queries */
  // Resets CSS display of PROJECTS depending on responsive
  // Checks screen width onload :
  window.onload = () => {
    windowWidthCheck(breakPoint);
  }
  // Checks screen width on resize :
  $(window).resize(() => {
    windowWidthCheck(breakPoint);
  });
  
  function windowWidthCheck(breakPoint) {
    if ($(window).width() > breakPoint) {
      displayDiv(projectToDisplay);
    } else {
      $('.center').children().css('display','flex');
    }
  }

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
    $(".project").css("display", "none");
    $(projectId).css("display", "flex");
  }

  function createClassId(number) {
    return (classIdOfProjectToDisplay = "project" + number);
  }
});
