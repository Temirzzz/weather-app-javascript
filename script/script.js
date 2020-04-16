document.querySelector('.sendBtn').onclick = getweather;
document.querySelector('.cityInp').addEventListener('keydown', (e) => {
    if (e.keyCode == 13) {
        getweather ();
        clearInp ();
        //console.log('work');        
    }
})

function getweather () {
    let city = document.querySelector('.cityInp').value;
    const token = 'dc72573ebccc1e10e685c929409e8a2c';
    let output = document.querySelector('.output');

    if (city == '') {
        //console.log('вы ничего не ввели');  
        chipsCreate ()       
    }
    else {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${token}&units=metric`)
            .then((response) => { 
                console.log(response.status);
                if (response.status == 404) {
                    console.log('Нет такого города');    
                    clearInp ();                
                }                
                else {
                    return response.json();
                }
            })
            .then((data) => {
                //console.log(data);                
                output.innerHTML += '<h3>' + data.name + '</h3>';
                output.innerHTML += '<p> Температура ' + data.main.temp + '&#8451</p>';
                output.innerHTML += '<p> Давление ' + data.main.pressure + '&#127777;</p>';
                output.innerHTML += '<p> Скорость ветра ' + data.wind.speed  + ' m/s &#9832;</p>';
                let sunrise = data.sys.sunrise;
                let datesr = new Date((sunrise + data.timezone) * 1000);
                datesr = datesr.getUTCHours() + ":" + datesr.getMinutes() + ":" + datesr.getSeconds();
                output.innerHTML += '<p> Рассвет ' + datesr + '</p>';
                let sunset = data.sys.sunset /* + data.timezone */ ;
                let datess = new Date((sunset + + data.timezone)*1000);
                datess = datess.getUTCHours() + ":" + datess.getMinutes() + ":" + datess.getSeconds();
                output.innerHTML += '<p> Закат ' + datess + '</p>';
                clearInp ();
            })
    }   
}
    
function clearInp () {
    document.querySelector('.cityInp').value = "";
}

function chipsCreate () {
	let chips = document.createElement('div');
	chips.classList.add('chips');
	let message = document.createTextNode("Введите город");
	chips.appendChild(message);
	let chiepsField = document.querySelector('.chieps-field');
	chiepsField.appendChild(chips);
	
	setTimeout(() => {
		chips.remove();
	}, 3000)
}