//user interface controller IIFE зарчимаар өгөгдлийн далдалт ашиглаж anonymous функц үүсгэлээ
var uiController = (function () {
  var DOMstrings = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    addBtn: ".add__btn",
  };
  return {
    getInput: function () {
      return {
        type: document.querySelector(DOMstrings.inputType).value,
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: document.querySelector(DOMstrings.inputValue).value,
      };
    },
    getDOMstrings: function () {
      return DOMstrings;
    },
  };
})();

//санхүү controller IIFE зарчимаар өгөгдлийн далдалт ашиглаж anonymous функц үүсгэлээ
var financeController = (function () {
  //Орлогын байгуулагч функц
  var Income = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };
  //Зарлагын байгуулагч функц
  var Expense = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };
  //Орлого зарлагыг нэг сав (data) дээр хийж хадгалах
  var data = {
    allItems: {
      inc: [],
      exp: [],
    },
    totals: {
      inc: 0,
      exp: 0,
    },
  };
})();

//холбогч модуль (evenListener)
//uiController ба financeController холбож өгөгдөл солигцох боломжих олгох
var appController = (function (uiController, financeController) {
  var ctrlAddItem = function () {
    //1. Оруулсан өгөгдлийг дэлгэцнээс олж авах
    console.log(uiController.getInput());
    //2. Олж авсан өгөгдлийг санхүүгийн контролд дамжуулж тэнд хадгална.
    //3. Олж авсан өгөгдлөө веб дээр тохирох хэсэг дээр хадгална.
    //4. Төсвийг тооцолно.
    //5. Эцсийн үлдэгдэл тооцоог дэлгэцэнд гаргана
  };
  var setupListener = function () {
    var DOM = uiController.getDOMstrings();
    document.querySelector(DOM.addBtn).addEventListener("click", function () {
      ctrlAddItem();
    });
    document.addEventListener("keypress", function (event) {
      if (event.keyCode === 13 || event.which === 13) {
        ctrlAddItem();
      }
    });
  };

  return {
    init: function () {
      console.log("App started");
      setupListener();
    },
  };
})(uiController, financeController);

appController.init();
