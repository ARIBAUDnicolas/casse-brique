
class Tableau1 extends Phaser.Scene{


    preload(){
        this.load.image('Balle', 'image/cercle.png');
        this.load.image('Murs', 'image/carre.png');
            }

    getFrames(prefix,length){
        let frames=[];
        for (let i=1;i<=length;i++){
            frames.push({key: prefix+i});
        }
        return frames;
    }

    create(){
        /******LONGUEUR DE BASE******/
        this.longeur = 800

        /************/
        this.speedX = 0
        while(this.speedX===0){
            this.speedX = 500*Phaser.Math.Between(-1,1)
        }
        this.speedY = Phaser.Math.Between(-500, 500)
        this.maxspeed = 500

        /*****BALLE*******/
        this.balle = this.physics.add.image(this.longeur/2, this.longeur*3/5, 'Balle');
        this.balle.setDisplaySize(20, 20);
        this.balle.body.setBounce(1,1);
        this.balle.body.setAllowGravity(false);


        /*****LES MURS*******/
        this.haut = this.physics.add.sprite(0, 0, 'Murs').setOrigin(0, 0);
        this.haut.setDisplaySize(this.longeur, 20);
        this.haut.body.setAllowGravity(false);
        this.haut.setImmovable(true);


        this.droite = this.physics.add.sprite(this.longeur-20, 0, 'Murs').setOrigin(0, 0);
        this.droite.setDisplaySize(20, this.longeur);
        this.droite.body.setAllowGravity(false);
        this.droite.setImmovable(true);

        this.gauche = this.physics.add.sprite(0, 0, 'Murs').setOrigin(0, 0);
        this.gauche.setDisplaySize(20, this.longeur);
        this.gauche.body.setAllowGravity(false);
        this.gauche.setImmovable(true);


        /*****BARRE DU JOUEUR*******/
        this.player = this.physics.add.sprite((this.longeur/2), this.longeur-30, 'Murs');
        this.player.setDisplaySize(200, 20);
        this.player.body.setAllowGravity(false);


        this.player.setImmovable(true)

        /*****BRIQUES*******/

        this.brique = this.physics.add.sprite((this.longeur/2), this.longeur/2, 'Murs');
        this.brique.setDisplaySize(60, 20);
        this.brique.body.setAllowGravity(false);


        this.brique.setImmovable(true)





        let me = this;
        this.physics.add.collider(this.player, this.balle,function(){
            console.log('touche player')
            me.rebond(me.player)
        })


        this.physics.add.collider(this.balle, this.haut)
        this.physics.add.collider(this.balle, this.gauche)
        this.physics.add.collider(this.balle, this.droite)

        this.balle.setMaxVelocity(this.maxspeed,this.maxspeed)

        this.physics.add.collider(this.gauche, this.player)
        this.physics.add.collider(this.droite, this.player)


        this.playerSpeed = 0


        this.joueurGauche = new Joueur('Trigger','joueurGauche')
        this.joueurDroite = new Joueur('Count','joueurDroite')
        console.log(this.joueurGauche)

        this.balleAucentre();
        this.initKeyboard();





    }

    rebond(players){
        let me = this ;
        console.log(this.player.x);
        console.log(me.balle.x);
        let hauteurPlayers = players.displayHeight;

        let positionRelativePlayers = (this.balle.x - players.x);

        positionRelativePlayers= (positionRelativePlayers / hauteurPlayers)
        positionRelativePlayers = positionRelativePlayers*2-1;

        this.balle.setVelocityY((this.balle.body.velocity.y + positionRelativePlayers) * 100);

    }

    balleAucentre(){
        this.balle.x = this.largeur/2
        this.balle.y = this.hauteur/2
        this.speedX = 0

        this.balle.setVelocityX(Math.random()>0.5?-300:300)
        this.balle.setVelocityY(0)
    }

    /**
     *
     * @param {Joueur} joueur
     */
    win(joueur){
        //alert('Joueur '+joueur.name+' gagne')
        joueur.score ++;
        //alert('Le score est de '+this.joueurGauche.score+' a '+this.joueurDroite.score)
        this.balleAucentre();
    }

    update(){
        if(this.balle.x>this.largeur){
            this.win(this.joueurGauche);
        }
        if(this.balle.x<0){
            this.win(this.joueurDroite);
        }
        this.player.x += this.playerSpeed


        if (this.player.x<30){
            this.player.x = 30
        }
        if (this.player.x>this.longeur-30){
            this.player.x =this.longeur-30
        }

        if (this.balle.y>)
    }

    initKeyboard(){
        let me = this
        this.input.keyboard.on('keydown', function (kevent) {
            switch (kevent.keyCode) {
                case Phaser.Input.Keyboard.KeyCodes.q:
                    me.playerSpeed = -7
                    break;
                case Phaser.Input.Keyboard.KeyCodes.d:
                    me.playerSpeed = 7
                    break;
            }
        });
        this.input.keyboard.on('keyup', function (kevent) {
            switch (kevent.keyCode) {
                case Phaser.Input.Keyboard.KeyCodes.S:
                    me.player1Speed = 0
                    break;
                case Phaser.Input.Keyboard.KeyCodes.X:
                    me.player1Speed = 0
                    break;
                case Phaser.Input.Keyboard.KeyCodes.J:
                    me.player2Speed = 0
                    break;
                case Phaser.Input.Keyboard.KeyCodes.N:
                    me.player2Speed = 0
                    break;
            }
        });
    }
}




