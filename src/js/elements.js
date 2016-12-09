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
$(function(){

        var field = new Array("company-name", "company-site");//поля обязательные 
                
        $("form").submit(function() {// обрабатываем отправку формы 
            var error=0; // индекс ошибки
            $("form").find(":input").each(function() {// проверяем каждое поле в форме
                for(var i=0;i<field.length;i++){ // если поле присутствует в списке обязательных
                    if($(this).attr("name")==field[i]){ //проверяем поле формы на пустоту
                        
                        if(!$(this).val()){// если в поле пустое
                            $(this).css('border', '#9b322a 1px solid');// устанавливаем рамку красного цвета
                            error=1;// определяем индекс ошибки                                              
                        }
                        else{
                            $(this).css('border', 'gray 1px solid');// устанавливаем рамку обычного цвета
                        }
                        
                    }                       
                }               
           })
           
           // //провека email адреса 
           //  var email = $("#email").val();
           //  if(!isValidEmailAddress(email)){
           //      error=2;
           //      $("#email").css('border', 'red 1px solid');// устанавливаем рамку красного цвета
           //  }
            
            // //провека совпадения паролей 
            // var pas1 = $("#pas1").val();
            // var pas2 = $("#pas2").val();
            // if(pas1!=pas2){
            //     error=3;
            //     $("#pas1").css('border', 'red 1px solid');// устанавливаем рамку красного цвета
            //     $("#pas2").css('border', 'red 1px solid');// устанавливаем рамку красного цвета
            // }
            
            if(error==0){ // если ошибок нет то отправляем данные
                return true;
            }
            else{
            var err_text = "";
            if(error==1)  err_text="Не все обязательные поля заполнены!";
            // if(error==2)  err_text="Введен не корректный e-mail!";
            // if(error==3)  err_text="Пароли не совпадают";
            
            $("#messenger").html(err_text); 
            $("#messenger").fadeIn("slow"); 
            return false; //если в форме встретились ошибки , не  позволяем отослать данные на сервер.
            }            
                
        })
    });
// /Register-company. Проверка заполненности форм
