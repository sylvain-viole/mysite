let projectToDisplay = 1;
const numberOfProjects = 4;

// EVENT BEHAVIOUR

$(document).ready(() => {
  // MODAL
  function modalText(event) {
    let modalInnerText = new Object()
    switch (event) {
      case 'mentionsLegales':
        modalInnerText.title = "Legal mentions";
        modalInnerText.content = "This site is the property of Sylvain Viole, it is hosted on GITHUB.";
        modalInnerText.btn = "Ok !";
        break;
        
        default:
          break;
        }
        return modalInnerText;
      }
      
  function buildModalContent(object) {
    $("#mod__title").text(object.title);
    $('#mod__paragraph').text(object.content);
    $("#mod__footer-btn").text(object.btn);
    console.log(object.title);
  }

  function displayModal(event) {
    let content = modalText(event);
    buildModalContent(content);
    let height = $(document).height();
    $('#mod__modal').addClass('visible');
    $('#mod__mask').css('height', Math.round(height));
    $('#mod__container').addClass('slide-in-top');
    setTimeout(() => {
      cleanClasses()
    }, 300);
  }

  function cleanClasses() {
    $("#mod__container").removeClass("slide-out-top");
    $("#mod__container").removeClass("slide-in-top");
  };
  
  function closeModal() {
    $("#mod__container").addClass("slide-out-top");
    setTimeout(() => {
      $('#mod__modal').removeClass('visible');
      $('#mod__mask').css('height', '0');
      cleanClasses();
    }, 300);
  }
  
  // event listener
  $('.mod__openner').on('click', (e) => {
    displayModal('mentionsLegales');
  
  })
  $('.close__modal').on('click', () => {
    closeModal();
  })
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
    $(".project").removeClass("visible");
    $(projectId).addClass("visible");
  }

  function createClassId(number) {
    return (classIdOfProjectToDisplay = "project" + number);
  }
});
