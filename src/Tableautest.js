class Tableau1 extends Phaser.Scene{

    preload(){
        this.load.image('Balle', 'assets/Images/cercle.png');
        this.load.image('Murs', 'assets/Images/carre.png');


    }

    create(){
        this.hauteur = 500
        this.largeur = 1000



        this.Balle=this.physics.add.image( this.largeur/2-10,this.hauteur/2-10,  'Balle').setOrigin(0,0);
        this.Balle.setDisplaySize(20,20);
        this.Balle.body.setBounce(3,3);
        this.Balle.setVelocityX(Phaser.Math.Between( -200,200));
        this.Balle.setVelocityY(Phaser.Math.Between( -50,50));
        this.Balle.setMaxVelocity(400,400);



        this.Haut=this.physics.add.image(0,0, 'Murs').setOrigin(0,0);
        this.Haut.setDisplaySize(this.largeur,20);
        this.Haut.body.setAllowGravity(false);
        this.Haut.setImmovable(true);


        this.Bas=this.physics.add.image(0,this.hauteur-20, 'Murs').setOrigin(0,0);
        this.Bas.setDisplaySize(this.largeur,20);
        this.Bas.body.setAllowGravity(false);
        this.Bas.setImmovable(true);


        this.gauche=this.physics.add.image(50,200, 'Murs').setOrigin(0,0);
        this.gauche.setDisplaySize(20,100);
        this.gauche.body.setAllowGravity(false);
        this.gauche.setImmovable(true);


        this.droite=this.physics.add.image(this.largeur-70,200, 'Murs').setOrigin(0,0);
        this.droite.setDisplaySize(20,100);
        this.droite.body.setAllowGravity(false);
        this.droite.setImmovable(true);


        this.data.set('j1', 0);
        this.data.set('j2', 0);

        this.J1 = this.add.text(100, 30, '', { font: '40px Courier', fill: '#808080' });
        this.J1.setText([
            'J1: ' + this.data.get('j1')
        ]);

        this.J2 = this.add.text(800, 30, '', { font: '40px Courier', fill: '#808080' });
        this.J2.setText([
            'J2: ' + this.data.get('j2')
        ]);

        let me = this;

        this.physics.add.collider(this.Balle,this.Bas);
        this.physics.add.collider(this.Balle,this.Haut);
        this.physics.add.collider(this.Balle,this.gauche, function() {
            console.log('touche gauche');
            me.rebond(me.gauche)
        });
        this.physics.add.collider(this.Balle,this.droite, function() {
            console.log('touche droite');
            me.rebond(me.droite)
        });

        this.initKeyboard();

    };

    rebond(raquette){
        let me = this;

        console.log(raquette.y);
        console.log(me.Balle.y);
        console.log(me.Balle.y-raquette.y)

    }

    initKeyboard(){
        let me = this;
        this.input.keyboard.on('keyup', function (kevent) {
            switch (kevent.keyCode) {
                case Phaser.Input.Keyboard.KeyCodes.S:
                    me.gauche.setVelocityY(0);
                    break;
                case Phaser.Input.Keyboard.KeyCodes.J:
                    me.droite.setVelocityY(0);
                    break;
                case Phaser.Input.Keyboard.KeyCodes.X:
                    me.gauche.setVelocityY(0);
                    break;
                case Phaser.Input.Keyboard.KeyCodes.N:
                    me.droite.setVelocityY(0);
                    break;
            }
        })
        this.input.keyboard.on('keydown', function (kevent) {
            switch (kevent.keyCode) {
                case Phaser.Input.Keyboard.KeyCodes.S:
                    me.gauche.setVelocityY(-500);
                    break;
                case Phaser.Input.Keyboard.KeyCodes.J:
                    me.droite.setVelocityY(-500);
                    break;
                case Phaser.Input.Keyboard.KeyCodes.X:
                    me.gauche.setVelocityY(500);
                    break;
                case Phaser.Input.Keyboard.KeyCodes.N:
                    me.droite.setVelocityY(500);
                    break;
            }

        })
    }



    update(){

        if (this.Balle.x>this.largeur){
            this.Balle.x = 0
        }

        if (this.Balle.x<0){
            this.Balle.x = this.largeur
        }

        if (this.Balle.y<0){
            this.Balle.y = 0
        }
        if (this.Balle.y>this.hauteur){
            this.Balle.y = this.hauteur
        }

        if (this.gauche.y<20){
            this.gauche.y = 20
        }
        if (this.gauche.y>this.hauteur-120){
            this.gauche.y =this.hauteur-120
        }
        if (this.droite.y<20){
            this.droite.y = 20
        }
        if (this.droite.y>this.hauteur-120){
            this.droite.y =this.hauteur-120
        }

    }

}
