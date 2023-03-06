            const sectionReiniciar = document.getElementById('Reiniciar')
            const botonMascotaJugador = document.getElementById('boton-mascota')
            const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
            const botonReiniciar = document.getElementById('boton-reiniciar')
            
            const sectionSeleccionarMascota = document.getElementById('seleccionar-mascota')
            const spanMascotaJugador = document.getElementById('mascota-jugador')
            
            const spanMascotaEnemigo = document.getElementById('mascota-enemigo')
            
            const spanVidasJugador = document.getElementById('vidas-jugador')
            const spanVidasEnemigo = document.getElementById('vidas-enemigo')
            
            const sectionMensajes = document.getElementById('Resultado')
            const ataquesDelJugador = document.getElementById('ataque-del-jugador')
            const ataquesDelEnemigo = document.getElementById('ataque-del-enemigo')
            
            const contenedorTarjetas = document.getElementById('contenedorTarjetas')
            const contenedorBotones = document.getElementById('contenedorBotones')
            
            const sectionVerMapa = document.getElementById('ver-mapa')
            const mapa = document.getElementById('mapa')
            
            const HIPODOGE_ATAQUES = [
                {nombre: 'agua', id: 'boton-agua'},
                {nombre: 'agua', id: 'boton-agua'},
                {nombre: 'agua', id: 'boton-agua'},
                {nombre: 'tierra', id: 'boton-tierra'},
                {nombre: 'fuego', id: 'boton-fuego'},
            ]
            
            const CAPIPEPO_ATAQUES = [
                {nombre: 'tierra', id: 'boton-tierra'},
                {nombre: 'tierra', id: 'boton-tierra'},
                {nombre: 'tierra', id: 'boton-tierra'},
                {nombre: 'agua', id: 'boton-agua'},
                {nombre: 'fuego', id: 'boton-fuego'},
            ]
            
            const RATIGUEYA_ATAQUES = [
                {nombre: 'fuego', id: 'boton-fuego'},
                {nombre: 'fuego', id: 'boton-fuego'},
                {nombre: 'fuego', id: 'boton-fuego'},
                {nombre: 'tierra', id: 'boton-tierra'},
                {nombre: 'agua', id: 'boton-agua'},
            ]
            let mokepones = []
            let ataqueJugador = []
            let ataqueEnemigo = []
            let opciones
            let opcionAtaques
            let input1 
            let input2 
            let input3 
            let ataquesMokepon
            let ataquesMokeponEnemigo
            let botonFuego
            let botonAgua
            let botonTierra
            let mascotaJugador
            let mascotaJugadorObjeto
            let botones = {}
            let indexAtaqueJugador
            let indexAtaqueEnemigo
            let victoriasJugador = 0;
            let victoriasEnemigo = 0;
            let vidasJugador = 3
            let vidasEnemigo = 3
            let lienzo = mapa.getContext('2d')
            let intervalo
            let mapaBackground = new Image()
            mapaBackground.src = './images/mokemap.png'
            let alturaEncontrar
            let anchoDeMapa = window.innerWidth - 20
            let jugadorId = null
            let enemigoId = null
            let mokeponesEnemigos = []
            
            const anchoMaximoMapa = 350
            
            if (anchoDeMapa > anchoMaximoMapa) {
                anchoDeMapa = anchoMaximoMapa - 20
            }
            
            alturaEncontrar = anchoDeMapa * 600 / 800
            
            mapa.width = anchoDeMapa
            mapa.height = alturaEncontrar
            
            let imagenMokepon = new Image
            
            class Mokepon {
                constructor(nombre, foto, vida, fotoMapa, id = null) {
                    this.id = id
                    this.nombre = nombre
                    this.foto = foto
                    this.vida = vida
                    this.ataques = []
                    this.ancho = 40
                    this.alto = 40
                    this.x = aleatorio(0, mapa.width - this.ancho)
                    this.y = aleatorio(0, mapa.height - this.alto)
                    this.mapaFoto = new Image()
                    this.mapaFoto.src = fotoMapa
                    this.velocidadX = 0
                    this.velocidadY = 0
                }
            
                pintarMokepon() {
                    lienzo.drawImage(
                        this.mapaFoto,
                        this.x,
                        this.y,
                        this.ancho,
                        this.alto
                    )
                }
            }
            
            let Hipodoge = new Mokepon('Hipodoge', 'images/hipodoge.png', 5, 'images/hipodoge_(icon).png')
            let Capipepo = new Mokepon('Capipepo', 'images/capipepo.png', 5, 'images/capipepo_(icon).png')
            let Ratigueya = new Mokepon('Ratigueya', 'images/ratigueya.png', 5, 'images/ratigueya_(icon).png')
            
            Hipodoge.ataques.push(...HIPODOGE_ATAQUES)
            
            Capipepo.ataques.push(...CAPIPEPO_ATAQUES)
            
            Ratigueya.ataques.push(...RATIGUEYA_ATAQUES)
            
            mokepones.push(Hipodoge, Capipepo, Ratigueya)
            
            function iniciarJuego() {
            
                sectionSeleccionarAtaque.style.display = 'none'
                sectionReiniciar.style.display = 'none'
                sectionVerMapa.style.display = 'none'
            
                mokepones.forEach((mokepon) => {
                    opciones = `
                    <input type="radio" name="mascota" id=${mokepon.nombre} />
                    <label class='tarjeta-mokepon' for=${mokepon.nombre}>
                        <p>${mokepon.nombre}</p>
                        <img src=${mokepon.foto} alt=${mokepon.nombre}>
                    </label>
                    `
                    contenedorTarjetas.innerHTML += opciones
            
                   input1 = document.getElementById('Hipodoge')
                   input2 = document.getElementById('Capipepo')
                   input3 = document.getElementById('Ratigueya')
                })
                
                botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)
                
                botonReiniciar.addEventListener('click', reiniciarJuego)
            
                unirseAlJuego()
            }
            
            function unirseAlJuego () {
                fetch('http://localhost:8080/unirse')
                    .then(function (res) {
                        console.log(res)
                        if (res.ok) {
                            res.text()
                                .then(function (respuesta) {
                                    console.log(respuesta)
                                    jugadorId = respuesta
                                })
                        }
                    })
            }
            
            //Selección Jugador y función aleatorio para Seleccion Enemigo
            
            function aleatorio(min, max){
                return Math.floor( Math.random()*(max - min + 1) + min)
            }
            
            function seleccionarMascotaJugador(){
                
            
                sectionSeleccionarMascota.style.display = 'none'
                
                if (input1.checked){
                    alert('Seleccionaste a Hipodoge')
                    spanMascotaJugador.innerHTML = input1.id
                    mascotaJugador = input1.id
                } else if (input2.checked) {
                    alert('Seleccionaste a Capipepo')
                    spanMascotaJugador.innerHTML = input2.id
                    mascotaJugador = input2.id
                } else if (input3.checked) {
                    alert('Seleccionaste a Ratigueya')
                    spanMascotaJugador.innerHTML = input3.id
                    mascotaJugador = input3.id
                } else {
                    alert('Aún no has seleccionado a tu mascota')
                }
            
                seleccionarMokepon(mascotaJugador)
            
                extraerAtaques(mascotaJugador)
                sectionVerMapa.style.display = 'flex'
                iniciarMapa()
                
            }
            
            function seleccionarMokepon(mascotaJugador) {
                fetch(`http://localhost:8080/mokepon/${jugadorId}`, {
                    method: 'post',
                    headers: {
                        'Content-Type': "application/json"
                    },
                    body: JSON.stringify({
                        mokepon: mascotaJugador
                    })
            
                })
            }
            
            //Seleccion Enemigo
            
            function extraerAtaques(){
                let ataques
                for (let i = 0; i < mokepones.length; i++) {
                    if (mascotaJugador === mokepones[i].nombre) {
                        ataques = mokepones[i].ataques
                    }
                    
                }
            
                mostrarAtaques(ataques)
            }
            
            function mostrarAtaques(ataques) {
                ataques.forEach((ataque) => {
                    ataquesMokepon = `
                    <button id=${ataque.id} class="ataques BAtaque">${ataque.nombre}</button>
                    `
                    contenedorBotones.innerHTML += ataquesMokepon
                })
            
                botonFuego = document.getElementById('boton-fuego')
                botonAgua = document.getElementById('boton-agua')
                botonTierra = document.getElementById('boton-tierra')
            
                botones = document.querySelectorAll('.BAtaque')
            
            }
            
            function seleccionarMascotaEnemigo(enemigo) {
                spanMascotaEnemigo.innerHTML = enemigo.nombre
                ataquesMokeponEnemigo = enemigo.ataques
                secuenciaAtaque()
                
            }
            
            
            //COMBATE
            
            function enviarAtaques(){
                fetch(`http://localhost:8080/mokepon/${jugadorId}/ataques`, {
                    method: "post",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify({
                        ataques: ataqueJugador
                    })
                })
            
                intervalo = setInterval(obtenerAtaques, 50)
            }
            
            function obtenerAtaques() {
                fetch(`http://localhost:8080/mokepon/${enemigoId}/ataques`)
                    .then(function (res) {
                        if (res.ok) {
                            res.json()
                                .then(function ({ ataques }) {
                                    if (ataques.length === 5) {
                                        ataqueEnemigo = ataques
                                        combate()
                                    }
                                })
                        }
                    })
            }
            
            function secuenciaAtaque() {
                botones.forEach((boton) => {
                    boton.addEventListener('click', (e) => {
                        if (e.target.textContent === 'fuego') {
                            ataqueJugador.push('FUEGO')
                            console.log(ataqueJugador)
                            boton.style.background = '#112f58'
                            boton.disabled = true
                        } else if (e.target.textContent === 'agua') {
                            ataqueJugador.push('AGUA')
                            console.log(ataqueJugador)
                            boton.style.background = '#112f58'
                            boton.disabled = true
                        } else {
                            ataqueJugador.push('TIERRA')
                            console.log(ataqueJugador)
                            boton.style.background = '#112f58'
                            boton.disabled = true
                        }
                        if(ataqueJugador.length === 5) {
                            enviarAtaques()
                        }
                        })
                    })
                }
            
            function ataqueAleatorioEnemigo() {
                console.log('Ataques enemigo', ataquesMokeponEnemigo)
                let ataqueAleatorio = aleatorio(0, ataquesMokeponEnemigo.length -1)
                
                if (ataqueAleatorio == 0 || ataqueAleatorio == 1) {
                    ataqueEnemigo.push('FUEGO')
                } else if (ataqueAleatorio == 3 || ataqueAleatorio == 4) {
                    ataqueEnemigo.push('AGUA')
                } else {
                    ataqueEnemigo.push('TIERRA')
                }
                console.log(ataqueEnemigo)
                iniciarCombate ()
            }
            
            function iniciarCombate() {
                if(ataqueJugador.length === 5) {
                    combate()
                }
            }
            
            function indexOponentes(jugador, enemigo) {
                indexAtaqueJugador = ataqueJugador[jugador]
                indexAtaqueEnemigo = ataqueEnemigo[enemigo]
            }
            
            
            function combate(){
            
                clearInterval(intervalo)
            
                for (let index = 0; index < ataqueJugador.length; index++) {
                    if(ataqueJugador[index] === ataqueEnemigo[index]) {
                        indexOponentes(index, index)
                        crearMensaje('EMPATE')
                    } else if (ataqueJugador[index] === 'FUEGO' && ataqueEnemigo[index] === 'TIERRA') {
                        indexOponentes(index, index)
                        crearMensaje('GANASTE')
                        victoriasJugador++;
                        spanVidasJugador.innerHTML = victoriasJugador;
                    } else if(ataqueJugador[index] === 'AGUA' && ataqueEnemigo[index] === 'FUEGO') {
                        indexOponentes(index, index)
                        crearMensaje('GANASTE')
                        victoriasJugador++;
                        spanVidasJugador.innerHTML = victoriasJugador;
                    } else if(ataqueJugador[index] === 'TIERRA' && ataqueEnemigo[index] === 'AGUA') {
                        indexOponentes(index, index)
                        crearMensaje('GANASTE')
                        victoriasJugador++;
                        spanVidasJugador.innerHTML = victoriasJugador;
                    } else {
                        indexOponentes(index, index)
                        crearMensaje('PERDISTE')
                        victoriasEnemigo++;
                        spanVidasEnemigo.innerHTML = victoriasEnemigo;
                    }
                }
                revisarVidas();
            }
            
            function revisarVidas() {
                if (victoriasJugador === victoriasEnemigo){
                    alert('¡EMPATE!')
                    crearMensaje('EMPATE')
                } else if(victoriasJugador > victoriasEnemigo) {    
                    alert('¡¡VICTORIA!!')
                    mensajeFinal('¡FELICIDADES! Continúa mejorando')
                } else {
                    alert('DERROTA')
                    mensajeFinal('Suerte a la proxima, ¡no te desanimes!')
                }
            }
            
            function crearMensaje(resultado) {
            
                let nuevoAtaqueJugador = document.createElement('p')
                let nuevoAtaqueEnemigo = document.createElement('p')
            
                sectionMensajes.innerHTML = resultado
                nuevoAtaqueJugador.innerHTML = indexAtaqueJugador
                nuevoAtaqueEnemigo.innerHTML = indexAtaqueEnemigo
                
                ataquesDelJugador.appendChild(nuevoAtaqueJugador)
                ataquesDelEnemigo.appendChild(nuevoAtaqueEnemigo)
            
            }
            
            
            function mensajeFinal(resultadoFinal) {
                
                sectionMensajes.innerHTML = resultadoFinal
            
                
            
                sectionReiniciar.style.display = 'block'
            
            }
            
            function reiniciarJuego() {
                location.reload()
            }
            
            function pintarCanvas() {
                mascotaJugadorObjeto.x = mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX
                mascotaJugadorObjeto.y = mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY
                lienzo.clearRect(0, 0, mapa.width, mapa.height)
                lienzo.drawImage(
                    mapaBackground,
                    0,
                    0,
                    mapa.width,
                    mapa.height
                )
                mascotaJugadorObjeto.pintarMokepon()
                
                enviarPosicion(mascotaJugadorObjeto.x, mascotaJugadorObjeto.y)
            
                mokeponesEnemigos.forEach(function (mokepon) {
                    mokepon.pintarMokepon()
                    revisarColision(mokepon)
                })
            }
            
            function enviarPosicion(x, y){
                fetch(`http://localhost:8080/mokepon/${jugadorId}/posicion`, {
                    method: "post",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        x,
                        y
                    })
                })
                .then(function (res) {
                    if(res.ok) {
                        res.json()
                            .then(function ({ enemigos }) {
                                console.log(enemigos)
                                mokeponesEnemigos = enemigos.map(function (enemigo){
                                    let mokeponEnemigo = null
                                    const mokeponNombre = enemigo.mokepon.nombre
                                    if (mokeponNombre === "Hipodoge"){
                                        mokeponEnemigo = new Mokepon('Hipodoge', 'images/hipodoge.png', 5, 'images/hipodoge_(icon).png', enemigo.id)
                                    } else if (mokeponNombre === "Capipepo") {
                                        mokeponEnemigo = new Mokepon('Capipepo', 'images/capipepo.png', 5, 'images/capipepo_(icon).png', enemigo.id)
                                    } else if (mokeponNombre === "Ratigueya") {
                                        mokeponEnemigo = new Mokepon('Ratigueya', 'images/ratigueya.png', 5, 'images/ratigueya_(icon).png', enemigo.id)
                                    }
            
                                    mokeponEnemigo.x = enemigo.x
                                    mokeponEnemigo.y = enemigo.y
                                    enemigoId = enemigo.id
            
                                    return mokeponEnemigo
            
                                })
            
                            })
                    }
                })
            }
            
            function moverDerecha() {
                mascotaJugadorObjeto.velocidadX = 5
            }
            function moverIzquierda() {
                mascotaJugadorObjeto.velocidadX = -5
            }
            function moverArriba() {
                mascotaJugadorObjeto.velocidadY = -5
            }
            function moverAbajo() {
                mascotaJugadorObjeto.velocidadY = 5
            }
            
            function detenerMovimiento() {
                mascotaJugadorObjeto.velocidadX = 0
                mascotaJugadorObjeto.velocidadY = 0
            }
            
            function presionarTecla(event) {
                switch (event.key) {
                    case 'w' || 'W':
                        moverArriba()
                        break;
                    case 's' || 'S':
                        moverAbajo()
                        break;
                    case 'a' || 'A':
                        moverIzquierda()
                        break;
                    case 'd' || 'D':
                        moverDerecha()
                        break
                    default:
                        break;
                }
            }
            
            function iniciarMapa() {
                mascotaJugadorObjeto = obtenerMokepon(mascotaJugador)
                console.log(mascotaJugadorObjeto, mascotaJugador)
            
                intervalo = setInterval(pintarCanvas, 50)
            
                window.addEventListener('keydown', presionarTecla)
                window.addEventListener('keyup', detenerMovimiento)
            }
            
            function obtenerMokepon() {
                for (let i = 0; i < mokepones.length; i++) {
                    if (mascotaJugador === mokepones[i].nombre) {
                        return mokepones[i]
                    }
                    
                }
            }
            
            function revisarColision(enemigo) {
                const arribaEnemigo = enemigo.y
                const abajoEnemigo = enemigo.y + enemigo.alto
                const derechaEnemigo = enemigo.x + enemigo.ancho
                const izquierdaEnemigo = enemigo.x
            
                const arribaMascota = 
                    mascotaJugadorObjeto.y
                const abajoMascota = 
                    mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto
                const derechaMascota = 
                    mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho
                const izquierdaMascota = 
                    mascotaJugadorObjeto.x
            
                if(
                    abajoMascota < arribaEnemigo ||
                    arribaMascota > abajoEnemigo ||
                    derechaMascota < izquierdaEnemigo ||
                    izquierdaMascota > derechaEnemigo
                ) {
                    return
                }
            
                detenerMovimiento()
                console.log('se detectó una colision')
                clearInterval(intervalo)
                alert(enemigo.nombre + ' salvaje, ¡ha aparecido!')
            
                sectionSeleccionarAtaque.style.display = 'flex'
                sectionVerMapa.style.display = 'none'
                seleccionarMascotaEnemigo(enemigo)
            }
            
            window.addEventListener('load', iniciarJuego)
