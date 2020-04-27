//user interface controller IIFE зарчимаар өгөгдлийн далдалт ашиглаж anonymous функц үүсгэлээ
var uiController = (function () {
  var DOMstrings = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    addBtn: ".add__btn",
    incomeList: ".income__list",
    expenseList: ".expenses__list",
    tosovLabel: ".budget__value",
    incomeLabel: ".budget__income--value",
    expenseLabel: ".budget__expenses--value",
    precentagLabel: ".budget__expenses--percentage",
    containerDiv: ".container",
    expensePercantagesLabel: ".item__percentage",
  };
  var NodeListForEach = function (list, callback) {
    for (var i = 0; i < list.length; i++) {
      callback(list[i], i);
    }
  };
  return {
    getInput: function () {
      return {
        type: document.querySelector(DOMstrings.inputType).value,
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: parseInt(document.querySelector(DOMstrings.inputValue).value),
      };
    },
    displayPercentages: function (allPrecentages) {
      //Зарлагын NodeList ийг олох
      var elements = document.querySelectorAll(
        DOMstrings.expensePercantagesLabel
      );
      //Элемент болгоны хувьд зарлагын хувийг массиваас авч шивж оруулах
      NodeListForEach(elements, function (el, index) {
        el.textContent = allPrecentages[index];
      });
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
    // {
    //   tosov: data.tosov,
    //   huvi: data.huvi,
    //   totalsInc: data.totals.inc,
    //   totalsExp: data.totals.exp,
    // };
    tusviigUzuuleh: function (tosov) {
      document.querySelector(DOMstrings.tosovLabel).textContent = tosov.tosov;
      document.querySelector(DOMstrings.incomeLabel).textContent =
        tosov.totalsInc;
      document.querySelector(DOMstrings.expenseLabel).textContent =
        tosov.totalsExp;
      if (tosov.huvi !== 0) {
        document.querySelector(DOMstrings.precentagLabel).textContent =
          tosov.huvi + "%";
      } else {
        document.querySelector(DOMstrings.precentagLabel).textContent =
          tosov.huvi;
      }
    },
    getDOMstrings: function () {
      return DOMstrings;
    },
    removeListItem: function (id) {
      var el = document.getElementById(id);
      el.parentNode.removeChild(el);
    },
    addListItem: function (item, type) {
      //Орлого зарлагын элементийг агуулсан html-ийг бэлтгэнэ
      var html;
      if (type === "inc") {
        list = DOMstrings.incomeList;
        html =
          '<div class= "item clearfix" id="inc-%id%"><div class="item__description">$DESCRIPTION$</div><div class="right clearfix"><div class="item__value">$VALUE$</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      } else {
        list = DOMstrings.expenseList;
        html =
          '<div class="item clearfix" id="exp-%id%"><div class="item__description">$DESCRIPTION$</div><div class="right clearfix"><div class="item__value">$VALUE$</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
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
    this.precentage = -1;
  };
  Expense.prototype.calcPercentage = function (totalIncome) {
    if (totalIncome > 0)
      this.precentage = Math.round((this.value / totalIncome) * 100);
    else this.precentage = 0;
  };
  Expense.prototype.getPrecentage = function () {
    return this.precentage;
  };
  var calculateTotal = function (type) {
    var sum = 0;
    data.items[type].forEach(function (el) {
      sum = sum + el.value;
    });
    data.totals[type] = sum;
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
    tosov: 0,
    huvi: 0,
  };
  return {
    tosovTootsooloh: function () {
      //Нийт зарлагын нийлбэрийг тооцоолно
      calculateTotal("inc");

      //Нийт орлогын нийлбэрийн тооцоолно
      calculateTotal("exp");

      //Төсвийг шинээр тооцоолно.
      data.tosov = data.totals.inc - data.totals.exp;

      //Орлого зарлагын хувийг тооцоолно
      if (data.totals.inc > 0)
        data.huvi = Math.round((data.totals.exp / data.totals.inc) * 100);
      else data.huvi = 0;
    },
    calculatePrecentages: function () {
      data.items.exp.forEach(function (el) {
        el.calcPercentage(data.totals.inc);
      });
    },
    getPrecentages: function () {
      var allPrecentages = data.items.exp.map(function (el) {
        return el.getPrecentage();
      });
      return allPrecentages;
    },
    tusuviigAvah: function () {
      return {
        tosov: data.tosov,
        huvi: data.huvi,
        totalsInc: data.totals.inc,
        totalsExp: data.totals.exp,
      };
    },
    deleteItem: function (type, id) {
      var ids = data.items[type].map(function (el) {
        return el.id;
      });
      var index = ids.indexOf(id);
      if (index !== -1) {
        data.items[type].splice(index, 1);
      }
    },
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
      //Төсвийн шинээр тооцоолоод дэлгэцэнд үзүүлнэ.
      updateTosov();
    }
  };
  var updateTosov = function () {
    //4. Төсвийг тооцолно.
    financeController.tosovTootsooloh();
    //5. Эцсийн үлдэгдэл
    var tusuv = financeController.tusuviigAvah();
    //6. Төсвийг тооцоог дэлгэцэнд гаргана
    uiController.tusviigUzuuleh(tusuv);
    //7.Элементүүдийн хувийг тооцоолно
    financeController.calculatePrecentages();
    //8.Элементүүдийн хувийг хүлээж авна
    var allPrecentages = financeController.getPrecentages();
    //9.Эдгээр хувийг дэлгэнд үзүүлнэ.
    uiController.displayPercentages(allPrecentages);
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

    document
      .querySelector(DOM.containerDiv)
      .addEventListener("click", function (event) {
        // console.log(event.target.id);
        var id = event.target.parentNode.parentNode.parentNode.parentNode.id;
        // inc-2
        if (id) {
          var arr = id.split("-");
          var type = arr[0];
          var itemId = parseInt(arr[1]);

          // console.log(type + "===>" + itemId);

          //1.Санхүүгийн модулиас type,id ашиглаад устгана
          financeController.deleteItem(type, itemId);
          //2.Дэлгэц дээрээс энэ элементийг устгана.
          uiController.removeListItem(id);
          //3.Үлдэгдэл тооцоог шинжилнэ харуулна
          updateTosov();
        }
      });
  };

  return {
    init: function () {
      console.log("App started");
      uiController.tusviigUzuuleh({
        tosov: 0,
        huvi: 0,
        totalsInc: 0,
        totalsExp: 0,
      });

      setupListener();
    },
  };
})(uiController, financeController);

appController.init();
