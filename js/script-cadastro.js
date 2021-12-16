addEventListener("load", function() {
    document.querySelector(".load-fullsreen").style.display = "none";
    setTimeout(function() {
       
    }, 1200);
});

var msg = document.querySelector('.msg-box'), alert = document.querySelector('.msg-alert'), btn_cad = document.querySelector(".btn-cadastro");
btn_cad.addEventListener("click", function() {
    let cadastro = document.querySelector('.form-cadastro'), r_ = "Essa requisição não funcionou.";
    let formData = new FormData(cadastro), object = {};

    formData.forEach((value, key) => object[key] = value);

    let json = JSON.stringify(object), 
    ajax = new XMLHttpRequest();

    ajax.open("POST", "index.php", true), 
    ajax.setRequestHeader("Content-type", "application/json"), 
    ajax.send(json), ajax.onreadystatechange = function() {
        btn_cad.disabled = true;
        msg.classList.add("animated");
            if (ajax.readyState == 4 && ajax.status == 200) {
                let data = JSON.parse(ajax.responseText);
    
                msg.style.display = 'block'; 
                alert.classList.add(data.tipo);    
    
                msg.classList.add("bounceInRight");
                document.getElementById("resposta").innerHTML = data.msg;
    
                if(data.url){
                    setTimeout(function() {
                        window.location.href = data.url;
                    }, 2000);
                }
            }else{
                msg.style.display = 'block'; 
                alert.classList.add("erro");
                
                msg.classList.add("bounceInRight");
                document.getElementById("resposta").innerHTML = r_;   
            }
    
            setTimeout(function() {
                msg.classList.remove("bounceInRight");
                msg.classList.add("bounceOutRight");
    
                setTimeout(function() {
                    msg.style.display = 'none'; 
                    msg.classList.remove("bounceOutRight");
                    msg.classList.remove("animated");
                    alert.classList.remove("erro");
                    btn_cad.disabled = false;
                }, 700);   
            }, 2500);     
        }
});