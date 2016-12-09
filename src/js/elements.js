//Main. Карусель 
      $(document).ready(function() {
        $('.carousel').carousel({
          interval: 3000
        })
      });

 // Search. Выбор вида. Поиск отчета
       $(document).ready(function(){
        $(".showView1").click(function(){
            $("#view1").slideToggle("slow"); //показать view1 - список, остальные скрыть
            $("#view2").hide();
            $("#view3").hide();
            $("#view4").hide();
            return false;
        });
    });

    $(document).ready(function(){
        $(".showView2").click(function(){
            $("#view2").slideToggle("slow"); //показать view2 - таблица, остальные скрыть
            $("#view1").hide();
            $("#view3").hide();
            $("#view4").hide();
            return false;
        });
    });

    $(document).ready(function(){
        $(".showView3").click(function(){
            $("#view3").slideToggle("slow"); //показать view3 - средние значки, остальные скрыть
            $("#view1").hide();
            $("#view2").hide();
            $("#view4").hide();
            return false;
        });
    });

    $(document).ready(function(){
        $(".showView4").click(function(){
            $("#view4").slideToggle("slow"); //показать view4 - крупные значки, остальные скрыть
            $("#view1").hide();
            $("#view2").hide();
            $("#view3").hide();
            return false;
        });
    });

   // /Search. Выбор вида. Поиск отчета

   // /Search. Выбор вида. Поиск организации 
       $(document).ready(function(){
            $(".o-showView1").click(function(){
                $("#o-view1").slideToggle("slow"); //показать o-view1 - список, остальные скрыть
                $("#o-view2").hide();
                $("#o-view3").hide();
                $("#o-view4").hide();
                return false;
            });
        });

        $(document).ready(function(){
            $(".o-showView2").click(function(){
                $("#o-view2").slideToggle("slow"); //показать o-view2 - таблица, остальные скрыть
                $("#o-view1").hide();
                $("#o-view3").hide();
                $("#o-view4").hide();
                return false;
            });
        });

        $(document).ready(function(){
            $(".o-showView3").click(function(){
                $("#o-view3").slideToggle("slow"); //показать o-view3 - средние значки, остальные скрыть
                $("#o-view1").hide();
                $("#o-view2").hide();
                $("#o-view4").hide();
                return false;
            });
        });

        $(document).ready(function(){
            $(".o-showView4").click(function(){
                $("#o-view4").slideToggle("slow"); //показать o-view4 - крупные значки, остальные скрыть
                $("#o-view1").hide();
                $("#o-view2").hide();
                $("#o-view3").hide();
                return false;
            });
        });

        // /Search. Выбор вида. Поиск организации

        //Search. При нажатии на кнопку поиска отобразить результаты поиска
        $(document).ready(function(){
            $(".btn-search-report").click(function(){       //при нажатии на вкладку "Поиск отчета"
                $(".search-results-report").show();         //показать результы поиска по отчету
                $(".search-results-organization").hide();   //скрыть результаты поиска по организации
                console.log("1");
                return false;
            });
        });        

        $(document).ready(function(){
            $(".btn-search-organization").click(function(){   //при нажатии на вкладку "Поиск организации"
                $(".search-results-organization").show();     //показать результы поиска по организации
                $(".search-results-report").hide();           //скрыть результаты поиска по отчету
                console.log("2");
                return false;
            });
        });
        // /Search. При нажатии на кнопку поиска отобразить результаты поиска


// Register-company. Проверка заполненности форм
function validate(){
   //Считаем значения из полей name и email в переменные x и y
   var x=document.forms["form-register-company"]["company-name"].value;
   var y=document.forms["form-register-company"]["company-site"].value;
   //Если поле name пустое выведем сообщение и предотвратим отправку формы
   if (x.length==0){
      document.getElementById("company-nameF").innerHTML="*данное поле обязательно для заполнения";
      return false;
   }
   //Если поле email пустое выведем сообщение и предотвратим отправку формы
   if (y.length==0){
      document.getElementById("company-siteF").innerHTML="*данное поле обязательно для заполнения";
      return false;
   }
   //Проверим содержит ли значение введенное в поле email символы @ и .
   // at=y.indexOf("@");
   // dot=y.indexOf(".");
   // //Если поле не содержит эти символы знач email введен не верно
   // if (at<1 || dot <1){
   //    document.getElementById("emailf").innerHTML="*email введен не верно";
   //    return false;
   // }
}
