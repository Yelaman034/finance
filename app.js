//user interface controller IIFE зарчимаар өгөгдлийн далдалт ашиглаж anonymous функц үүсгэлээ
var uiController = (function () {})();

//санхүү controller IIFE зарчимаар өгөгдлийн далдалт ашиглаж anonymous функц үүсгэлээ
var financeController = (function () {})();

//холбогч модуль (evenListener)
//uiController ба financeController холбож өгөгдөл солигцох боломжих олгох
var appController = (function (uiController, financeController) {
  var ctrlAddItem = function () {
    console.log("Hello");
    //1. Оруулсан өгөгдлийг дэлгэцнээс олж авах
    //2. Олж авсан өгөгдлийг санхүүгийн контролд дамжуулж тэнд хадгална.
    //3. Олж авсан өгөгдлөө веб дээр тохирох хэсэг дээр хадгална.
    //4. Төсвийг тооцолно.
    //5. Эцсийн үлдэгдэл тооцоог дэлгэцэнд гаргана
  };
  document.querySelector(".add__btn").addEventListener("click", function () {
    ctrlAddItem();
  });
  document.addEventListener("keypress", function (event) {
    if (event.keyCode === 13 || event.which === 13) {
      ctrlAddItem();
    }
  });
})(uiController, financeController);
