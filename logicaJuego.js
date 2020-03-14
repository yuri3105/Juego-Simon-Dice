
      const celeste = document.getElementById('celeste')
      const violeta = document.getElementById('violeta')
      const naranja = document.getElementById('naranja')
      const verde = document.getElementById('verde')
      const btnEmpezar = document.getElementById('btnEmpezar') //obtenemos lso elementos del Dom, asi podremos manipularlos en el documento
      const ULTIMO_NIVEL = 10

      class Juego {
        constructor() {
          this.inicializar()
          this.generarSecuencia()

          setTimeout(this.siguenteNivel, 500)

        }

        inicializar() {
          this.siguenteNivel = this.siguenteNivel.bind(this)
          this.elegirColor = this.elegirColor.bind(this)
          this.toggleBtnEmpezar()
        //  btnEmpezar.classList.add('hide') // agrega una clase al elemento, en este caso trae "hide" del css y cambia su atributo display a none
          this.nivel = 1
          this.colores ={
            celeste,
            violeta,
            naranja,
            verde
            }
          }
        
        generarSecuencia(){
          this.secuencia =  new Array(ULTIMO_NIVEL).fill(0).map(n => Math.floor(Math.random() * 4) )
        }

        siguenteNivel(){
          this.subnivel =  0
          this.iluminarSecuencia()
          this.agregarEventosClick()
        }

        trasfromarDeNumeroAColor(numero){

          switch (numero) {
            case 0: 
            return 'celeste' 
            case 1:
              return 'violeta'
            case 2:
              return 'naranja'
            case 3:
              return 'verde'
          }
        }

          trasfromarcolorANumero(color){

            switch (color) {
              case 'celeste': 
              return 0
              case 'violeta':
                return 1
              case 'naranja':
                return 2
              case 'verde':
                return 3
            }
        }


        toggleBtnEmpezar(){
          if (btnEmpezar.classList.contains('hide')) {
            btnEmpezar.classList.remove ('hide')
          }else{
            btnEmpezar.classList.add('hide')
          }
        }

      iluminarSecuencia(){
        for (let i = 0; i < this.nivel; i++) {                       // el ciclo compara entre el contador y  el nivel 
        const color =  this.trasfromarDeNumeroAColor(this.secuencia[i])
          setTimeout(()=> this.iluminarColor(color), 1000 * i)//multiplica el tiempo que se demora por el i del for

          
        }
      }

      iluminarColor(color){
        this.colores[color].classList.add('light')
        setTimeout(() => this.apagarColor(color),350)



      }


        apagarColor(color){
          this.colores[color].classList.remove('light')

        }


        agregarEventosClick(){
          this.colores.celeste.addEventListener('click', this.elegirColor )
          this.colores.violeta.addEventListener('click', this.elegirColor )
          this.colores.verde.addEventListener('click', this.elegirColor )
          this.colores.naranja.addEventListener('click', this.elegirColor )

        }
        eliminarEventosClick(){
          this.colores.celeste.removeEventListener('click', this.elegirColor )
          this.colores.violeta.removeEventListener('click', this.elegirColor )
          this.colores.verde.removeEventListener('click', this.elegirColor )
          this.colores.naranja.removeEventListener('click', this.elegirColor )



        }
        

        elegirColor(ev){
          const nombreColor = ev.target.dataset.color
          const numeroColor = this.trasfromarcolorANumero(nombreColor)
          this.iluminarColor(nombreColor)
          if(numeroColor === this.secuencia[this.subnivel]){
 
            this.subnivel++
            if (this.subnivel === this.nivel){
              this.nivel++
              this.eliminarEventosClick()
              if (this.nivel === (ULTIMO_NIVEL + 1 )) {
                this.ganoElJuego()
                
              }else {
                 setTimeout(this.siguenteNivel, 1500)
              }
            }
          }else {
            this.PerdioElJuego()
          }
        }


        ganoElJuego(){
          swal('Platzi','Felicitaciones, ganaste el juego!','success')
          .then (this.inicializar.bind(this))


        }


        PerdioElJuego(){
          swal('Platzi','Lo lamentamos, perdiste :( ','error')
          .then (() => {
           this.eliminarEventosClick()
           this.inicializar() 

          })


        }


       }

      function empezarJuego() {
        window.juego = new Juego()

      }