
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
        this.balle.setTintFill(0xffffff)


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
        this.player.setTintFill(0xffffff)


        this.player.setImmovable(true)

        /*****BRIQUES*******/


        this.brique = this.physics.add.sprite((this.longeur/2), this.longeur/2, 'Murs');
        this.brique.setDisplaySize(60, 20);
        this.brique.body.setAllowGravity(false);
        this.brique.setImmovable(true)
        this.physics.add.collider(this.brique, this.balle,function(){
            console.log('touche brique')

        })


        /*****Collisions*******/
        let me = this;
        this.physics.add.collider(this.player, this.balle,function(){
            console.log('touche player')
            me.rebond(me.player)
        })


        this.physics.add.collider(this.balle, this.haut)
        this.physics.add.collider(this.balle, this.gauche)
        this.physics.add.collider(this.balle, this.droite)

        this.balle.setMaxVelocity(this.maxspeed,this.maxspeed)



        this.playerSpeed = 0


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

        this.balle.setVelocityX((positionRelativePlayers)*20);
        /**moi ??tre presque suicid??, mais moi avoir r??ussit**/

    }
    /**
     *
     * @param {Joueur} joueur
     */
    loose(joueur){

        joueur.score =0;

        this.balleAucentre();
    }

    balleAucentre(){
        
        this.balle.x = this.longeur/2
        this.balle.y = this.longeur/2
        this.speedX = 0



        this.balle.setVelocityX(0)
        this.balle.setVelocityY(500)
    }

    update(){
        if(this.balle.y>this.longeur) {
            this.balleAucentre()
        }

        this.player.x += this.playerSpeed

        if (this.player.x<120){
            this.player.x = 120
        }
        if (this.player.x>this.longeur-120){
            this.player.x =this.longeur-120
        }




    }

    initKeyboard(){
        let me = this
        this.input.keyboard.on('keydown', function (kevent) {
            switch (kevent.keyCode) {
                case Phaser.Input.Keyboard.KeyCodes.LEFT:
                    me.playerSpeed = -7
                    break;
                case Phaser.Input.Keyboard.KeyCodes.RIGHT:
                    me.playerSpeed = 7
                    break;
            }
        });
        this.input.keyboard.on('keyup', function (kevent) {
            switch (kevent.keyCode) {
                case Phaser.Input.Keyboard.KeyCodes.LEFT:
                    me.playerSpeed = 0
                    break;
                case Phaser.Input.Keyboard.KeyCodes.RIGHT:
                    me.playerSpeed = 0
                    break;

            }
        });
    }
}


