// Main slick-слайдер http://kenwheeler.github.io/slick/
$('.autoplay').slick({
  slidesToShow: 7,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
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

// Search. Интерактивный поиск
$(document).ready(function() {
  $(".js-example-basic-single").select2();
});

$(document).ready(function() {
  $(".js-example-basic-multiple").select2();
});
// /Search. Интерактивный поиск


//      Register-company. Проверка заполненности форм
$(function(){
        var field = new Array
        ("company_name", "company_site", "company_description", "CEO", "company_law_address", 
        "writer_fio", "writer_position", "writer_email", "writer_phone",
        "registrator_fio", "registrator_position", "registrator_email", "registrator_phone",
        "count_page"
        );  //поля обязательные 
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
              
            if(error==0){ // если ошибок нет то отправляем данные
                return true;
            }
            else{
            var err_text = "";
            if(error==1)  err_text="Не все обязательные поля заполнены!";
            
            $("#messenger-company").html(err_text); 
            $("#messenger-company").fadeIn("slow");             

            $("#messenger-report").html(err_text); 
            $("#messenger-report").fadeIn("slow"); 
            return false; //если в форме встретились ошибки , не  позволяем отослать данные на сервер.
            }            
                
        })
    });
//      /Register-company. Проверка заполненности форм

//      Register-company. Загрузка логотипа

//Проверка загружен ли логотип
$(document).ready(function(){
     $("#register-company").submit(function(){
          if($("#upload-logo").val() == ""){
              alert("Загрузите логотип компании!");
              return false;
          }else{
              return true;
          }               
     });
});

//Проверка формата логотипа
var filesExtImages = ['jpg', 'png']; // массив расширений
$('#upload-logo').change(function(){
    var parts = $(this).val().split('.');
    if(filesExtImages.join().search(parts[parts.length - 1]) != -1){
        // alert('Good!');
    } else {
        alert('Логотип должен быть в формате JPG или PNG!');
    }
});

// Показать имя загруженного файла
$(document).ready( function() {
    $(".upload input[type=file]").change(function(){
         var filename = $(this).val().replace(/.*\\/, "");
         $("#filename").val(filename);
    });
});
// /Показать имя загруженного файла
// /Register-company. Загрузка логотипа




//      Register-report. Загрузка отчета и обложки отчета
// Показать имя обложки
$(document).ready( function() {
    $(".upload_cover input[type=file]").change(function(){
         var covername = $(this).val().replace(/.*\\/, "");
         $("#covername").val(covername);
    });
});

// Показать имя отчета на русском
$(document).ready( function() {
    $(".upload_ru_pdf input[type=file]").change(function(){
         var ru_pdf = $(this).val().replace(/.*\\/, "");
         $("#ru_pdf").val(ru_pdf);
    });
});

// Показать имя отчета на англ
$(document).ready( function() {
    $(".upload_en_pdf input[type=file]").change(function(){
         var en_pdf = $(this).val().replace(/.*\\/, "");
         $("#en_pdf").val(en_pdf);
    });
});

//Проверка загружен ли отчет
$(document).ready(function(){
     $("#register-report").submit(function(){
          if($("#upload-report").val() == ""){
              alert("Загрузите отчет компании!");
              return false;
          }else{
              return true;
          }               
     });
});
//Проверка загружена ли обложка
$(document).ready(function(){
     $("#register-report").submit(function(){
          if($("#upload-cover").val() == ""){
              alert("Загрузите обложку отчета!");
              return false;
          }else{
              return true;
          }               
     });
});

//Провека формата обложки отчета
var filesExtCover = ['jpg', 'png', 'jpeg']; // массив расширений
$('#upload-cover').change(function(){
    var parts = $(this).val().split('.');
    if(filesExtCover.join().search(parts[parts.length - 1]) != -1){
        // alert('Good!');
    } else {
        alert('Обложка отчета должен быть в формате JPG, JPEG или PNG!');
    }
});

//Провека формата отчета
var filesExtReport = ['pdf']; // массив расширений
$('#upload-report').change(function(){
    var parts = $(this).val().split('.');
    if(filesExtReport.join().search(parts[parts.length - 1]) != -1){
        // alert('Good!');
    } else {
        alert('Отчет должен быть в формате PDF!');
    }
});

//Провека формата отчета
var filesExtReport = ['pdf']; // массив расширений
$('#upload-report2').change(function(){
    var parts = $(this).val().split('.');
    if(filesExtReport.join().search(parts[parts.length - 1]) != -1){
        // alert('Good!');
    } else {
        alert('Отчет должен быть в формате PDF!');
    }
});
//Проверка загружена ли обложка
$(document).ready(function(){
     $("#register-report").submit(function(){
          if($("#upload-cover2").val() == ""){
              alert("Загрузите обложку отчета!");
              return false;
          }else{
              return true;
          }               
     });
});

//Ограничение ввода символов
function quotesBan(input) { 
    var value = input.value; 
    var rep = /[<>]/; //запрещенные символы
    if (rep.test(value)) { 
        value = value.replace(rep, ''); 
        input.value = value; 
    } 
} 


// /Register-report. Загрузка отчета и обложки отчета


