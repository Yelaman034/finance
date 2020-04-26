//user interface controller IIFE зарчимаар өгөгдлийн далдалт ашиглаж anonymous функц үүсгэлээ
var uiController = (function () {
  var DOMstrings = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    addBtn: ".add__btn",
    incomeList: ".income__list",
    expenseList: ".expenses__list",
  };
  return {
    getInput: function () {
      return {
        type: document.querySelector(DOMstrings.inputType).value,
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: document.querySelector(DOMstrings.inputValue).value,
      };
    },
    clearFields: function () {
      var fields = document.querySelectorAll(
        DOMstrings.inputDescription + "," + DOMstrings.inputValue
      );
      //Convert list Array

      var fieldsArr = Array.prototype.slice.call(fields);

      //3 арга
      fieldsArr.forEach((element) => {
        element.value = "";
      });
      fieldsArr[0].focus();
      //2 arga
      // fieldsArr.forEach(function (el, index, array) {
      //   el.value = "";
      // });
      //3/ arga
      // for (var i = 0; i < fieldsArr.length; i++) {
      //   fieldsArr[i].value = "";
      // }
    },
    getDOMstrings: function () {
      return DOMstrings;
    },
    addListItem: function (item, type) {
      //Орлого зарлагын элементийг агуулсан html-ийг бэлтгэнэ
      var html;
      if (type === "inc") {
        list = DOMstrings.incomeList;
        html =
          '<div class= "item clearfix" id="income-%id%"><div class="item__description">$DESCRIPTION$</div><div class="right clearfix"><div class="item__value">$VALUE$</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      } else {
        list = DOMstrings.expenseList;
        html =
          '<div class="item clearfix" id="expense-%id%"><div class="item__description">$DESCRIPTION$</div><div class="right clearfix"><div class="item__value">$VALUE$</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      }
      //Тэр html дотроо орлого зарлагын утгуудыг REPLACE хийж өөрчилж өгнө.
      var html = html.replace("%id%", item.id);
      var html = html.replace("$DESCRIPTION$", item.description);
      var html = html.replace("$VALUE$", item.value);

      //Бэлтгэсэн html ээ DOM руу хийж өгнө
      document.querySelector(list).insertAdjacentHTML("beforeend", html);
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
    items: {
      inc: [],
      exp: [],
    },
    totals: {
      inc: 0,
      exp: 0,
    },
  };
  return {
    addItem: function (type, dis, val) {
      var item, id;

      if (data.items[type].length == 0) id = 1;
      else {
        id = data.items[type][data.items[type].length - 1].id + 1;
      }

      if (type === "inc") {
        item = new Income(id, dis, val);
      } else {
        item = new Expense(id, dis, val);
      }
      data.items[type].push(item);
      return item;
    },
    seeData: function () {
      return data;
    },
  };
})();

//холбогч модуль (evenListener)
//uiController ба financeController холбож өгөгдөл солигцох боломжих олгох
var appController = (function (uiController, financeController) {
  var ctrlAddItem = function () {
    //1. Оруулсан өгөгдлийг дэлгэцнээс олж авах
    //эндээр (+,-),(Тайлбар),(дүн) input дотор хадгална.
    var input = uiController.getInput();

    //Хоосон байгаа эсэхийг шалгах
    if (input.description !== "" && input.value !== "") {
      //2. Олж авсан өгөгдлийг санхүүгийн контролд дамжуулж тэнд хадгална.
      var item = financeController.addItem(
        input.type,
        input.description,
        input.value
      );
      //3. Олж авсан өгөгдлөө веб дээр тохирох хэсэг дээр хадгална.
      uiController.addListItem(item, input.type);
      uiController.clearFields();
      //4. Төсвийг тооцолно.
      //5. Эцсийн үлдэгдэл тооцоог дэлгэцэнд гаргана
    }
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
