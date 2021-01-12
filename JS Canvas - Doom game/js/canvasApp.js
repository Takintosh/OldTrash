$(document).ready(canvasApp);
function canvasApp() {

    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    var xs = canvas.width / 2;
    var ys = canvas.height / 2;
    var rs = 20;
    var wr = 5;
    var hr = 5;
    var xr = 0;
    var yr = canvas.height / 2 - hr / 2;

    // Blood
    var yb1 = [];
    var xb1 = [];
    var nb1 = 20;
    for (var i = 0; i < nb1; i++) {
        yb1.push(Math.round(Math.random() * (canvas.height - 100)));
        xb1.push(Math.round(Math.random() * (canvas.width - 100)));
    }
    var yb2 = [];
    var xb2 = [];
    var nb2 = 20;
    for (var i = 0; i < nb2; i++) {
        yb2.push(Math.round(Math.random() * (canvas.height - 100)));
        xb2.push(Math.round(Math.random() * (canvas.width - 100)));
    }

    //Powerup
    var xpu = [];
    var ypu = [];
    var wpu = 45;
    var hpu = 40;
    var points = 0;
    xpu.push(Math.round(Math.random() * (canvas.width - 30)));
    ypu.push(Math.round(Math.random() * (canvas.height - 30)));

    //Corpse
    var yc1 = [];
    var xc1 = [];
    var nc1 = 2;
    for (var i = 0; i < nc1; i++) {
        yc1.push(Math.round(Math.random() * (canvas.height - 100)));
        xc1.push(Math.round(Math.random() * (canvas.width - 100)));
    }

    //Pile
    var ygr = [];
    var xgr = [];
    var ngr = 1;
    for (var i = 0; i < ngr; i++) {
        ygr.push(Math.round(Math.random() * (canvas.height - 100)));
        xgr.push(Math.round(Math.random() * (canvas.width - 100)));
    }

    var v = 0;
    var d = 0;
    var moveu = false;

    var key = 0;
    var dead = false;
    var pick = false;
    var c_shot = 0;
    var load = 0;
    var total = 22;
    var cload = 0;
    var interval = 100;
    var loop = setInterval(isLoaded, interval);
    var vel = 20;
    var vel_ret = 30;
    var maxpoints = 10;
    var death = 0;

    //Adicionando o som
    var theme;
    var link1 = "sounds/bg1.mp3";
    var impact;
    var link2 = "sounds/impact.wav";
    var lostsoul;
    var link3 = "sounds/attack.wav";
    var die_sound1;
    var link41 = "sounds/die1.wav";
    var die_sound2;
    var link42 = "sounds/die2.wav";
    var win_sound;
    var link5 = "sounds/boss.wav";
    var powerup_sound;
    var link6 = "sounds/powerup.wav";

    //Images
    var img_back;
    var img_blood;
    var img_blood2;
    var img_corpse1;
    var img_pile;
    var img_logo;
    var img_marine_r;
    var img_marine_l;
    var img_marine_u;
    var img_marine_d;
    var img_marine_dead;
    var img_lostsoul_h;
    var img_lostsoul_v;
    var img_lostsoul_d;
    var img_powerup;

    var c_sprites = 0;
    var c_spritesS = 0;
    var c_spritesD = -1;
    var dir_cb = 'down';
    var state_cb = 'stop';

    //Criando e configurando o audio
    theme = new Audio(link1);
    theme.load();
    theme.volume = 0.5;
    if (typeof theme.loop === 'boolean')
    {
        theme.loop = true;
    } else {
        theme.addEventListener('ended', function () {
            this.currentTime = 0;
        }, false);
    }
    theme.addEventListener('canplaythrough', function () {
        load++;
        this.oncanplaythrough = null;
    }, false);

    impact = new Audio(link2);
    impact.load(); 
    impact.volume = .5;
    impact.addEventListener('canplaythrough', function () {
        load++;
        this.oncanplaythrough = null;
    }, false);

    lostsoul = new Audio(link3);
    lostsoul.load();
    lostsoul.volume = .3;
    lostsoul.addEventListener('canplaythrough', function () {
        load++;
        this.oncanplaythrough = null;
    }, false);

    die_sound1 = new Audio(link41);
    die_sound1.load();
    die_sound1.volume = .5;
    die_sound1.addEventListener('canplaythrough', function () {
        load++;
        this.oncanplaythrough = null;
    }, false);
    die_sound2 = new Audio(link42);
    die_sound2.load();
    die_sound2.volume = .5;
    die_sound2.addEventListener('canplaythrough', function () {
        load++;
        this.oncanplaythrough = null;
    }, false);

    win_sound = new Audio(link5);
    win_sound.load();
    win_sound.volume = 1;
    win_sound.addEventListener('canplaythrough', function () {
        load++;
        this.oncanplaythrough = null;
    }, false);

    powerup_sound = new Audio(link6);
    powerup_sound.load();
    powerup_sound.volume = 1;
    powerup_sound.addEventListener('canplaythrough', function () {
        load++;
        this.oncanplaythrough = null;
    }, false);

    //CREATE LOAD IMAGENS
    img_logo = new Image();
    img_logo.src = 'img/logo.png';
    img_logo.addEventListener('load', function () {
        load++;
    }, false);

    img_marine_r = new Image();
    img_marine_r.src = 'img/sprites/marine_right.png';
    img_marine_r.addEventListener('load', function () {
        load++;
    }, false);

    img_marine_l = new Image();
    img_marine_l.src = 'img/sprites/marine_left.png';
    img_marine_l.addEventListener('load', function () {
        load++;
    }, false);

    img_marine_u = new Image();
    img_marine_u.src = 'img/sprites/marine_up.png';
    img_marine_u.addEventListener('load', function () {
        load++;
    }, false);

    img_marine_d = new Image();
    img_marine_d.src = 'img/sprites/marine_down.png';
    img_marine_d.addEventListener('load', function () {
        load++;
    }, false);

    img_marine_dead = new Image();
    img_marine_dead.src = 'img/sprites/marine_dead.png';
    img_marine_dead.addEventListener('load', function () {
        load++;
    }, false);

    img_lostsoul_h = new Image();
    img_lostsoul_h.src = 'img/lostsoul_h.png';
    img_lostsoul_h.addEventListener('load', function () {
        load++;
    }, false);
    img_lostsoul_v = new Image();
    img_lostsoul_v.src = 'img/lostsoul_v.png';
    img_lostsoul_v.addEventListener('load', function () {
        load++;
    }, false);
    img_lostsoul_d = new Image();
    img_lostsoul_d.src = 'img/lostsoul_d.png';
    img_lostsoul_d.addEventListener('load', function () {
        load++;
    }, false);

    img_back = new Image();
    img_back.src = 'img/tile.jpg';
    img_back.addEventListener('load', function () {
        load++;
    }, false);

    img_blood = new Image();
    img_blood.src = 'img/blood1.png';
    img_blood.addEventListener('load', function () {
        load++;
    });
    img_blood2 = new Image();
    img_blood2.src = 'img/blood2.png';
    img_blood2.addEventListener('load', function () {
        load++;
    });

    img_corpse1 = new Image();
    img_corpse1.src = 'img/corpse1.png';
    img_corpse1.addEventListener('load', function () {
        load++;
    });

    img_pile = new Image();
    img_pile.src = 'img/CorpsePile.png';
    img_pile.addEventListener('load', function () {
        load++;
    });

    img_powerup = new Image();
    img_powerup.src = 'img/sprites/soulsphere.png';
    img_powerup.addEventListener('load', function () {
        load++;
    }, false);


    function mainLoop() {

        moveLostSoul();

        if (state_cb === 'walk') {
            moveMarine();
        }

        drawBackground();
        
        print_center("Score: "+ points, 10, 'black');
        
        if(death === 0) {
            drawMarine();
        } else if (death === 1) {
            drawDeath();
        }

        drawLostSoul();
        
        drawPowerup();

        dead = colisao(xr, yr, wr, hr, xs, ys, rs);
        pick = pickitem(xpu[0], ypu[0], wpu, hpu, xs, ys, rs);
        
        if (pick) {
            powerup_sound.play();
            points = points+1;
            spawnPowerup();
        }
        if (dead) {
            if(Math.round(Math.random())) {
                die_sound1.play();
            } else {
                die_sound2.play();
            }
            impact.play();
            theme.pause();
            theme.currentTime = 0;
            blood(50, 8);
            death = 1;
        } else if (points > maxpoints){
                theme.volume = 0.1;
                win_sound.play();
                clearInterval(loop);
                print_center("FINISHED", canvas.height / 2, 'black');
            }

        if (!moveu) {
            print_center("Controle o marine com as teclas A B C D ! Fuja dos tiros !!!"
                    , "rgba(0,0,0,.5)"
                    , 36);
        }

    }//FIM MAIN LOOP


    function moveMarine() {//receve o código da tecla apertada
        if (xs <= canvas.width - rs + 1 && xs >= 0) {//Não deixa o smile sair do canvas
            if (dir_cb === 'right') {
                xs += vel;
                moveu = true;
            } else if (dir_cb === 'left') {
                xs -= vel;
                moveu = true;
            }
        }
        if (ys <= canvas.height - rs + 1 && ys >= 0) {
            if (dir_cb === 'up') {
                ys -= vel;
                moveu = true;
            } else if (dir_cb === 'down') {
                ys += vel;
                moveu = true;
            }
        }
        //Impede o marine de sair para fora do canvas
        if (xs > (canvas.width - rs + 1)) {
            xs = canvas.width - rs + 1;
        } else if (xs - rs + 1 < 0) {
            xs = rs + 1;
        }
        if (ys > (canvas.height - rs + 1)) {
            ys = canvas.height - rs + 1;
        } else if (ys - rs + 1 < 0) {
            ys = rs + 1;
        }
    }

//funçao para mover os quadrados aleatóriamente
    function moveLostSoul() {

        if (moveu) {
            if (yr > canvas.height || xr > canvas.width) {
                c_shot++;
                lostsoul.currentTime = 0;
                lostsoul.play();
                v = Math.round(Math.random());
                d = Math.round(Math.random());
                xr = 0;
                yr = 0;
                if (v) {
                    xr = xs;
                    if (d)
                        xr = Math.random() * canvas.width - 50;
                } else {
                    yr = ys;
                    if (d)
                        yr = Math.random() * canvas.height - 50;
                }
            }
            if (v) {
                yr += vel_ret;
                if (d)
                    xr += vel_ret / 2;
            } else {
                xr += vel_ret;
                if (d)
                    yr += vel_ret / 2;
            }
        } else {
            xr += vel_ret;
        }
    }

//teste de colisão simples baseado apenas nas posições x e y dos objetos
    function colisao(x1, y1, w1, h1, x2, y2, rs) {
//testa se x2 esta em x1        
        var x = x1;// - rs;
        var y = y1;// - rs;
        var w = w1 + rs * 2;
        var h = h1 + rs * 2;
        //Retângulo ampliado
//        context.strokeStyle = "#000";
//        context.strokeRect(x, y, w, h);
//        context.strokeStyle = "red";
//        context.strokeRect(x2, y2, 1, 1);
        if ((x2 >= x && x2 <= x + w) && ((y2 >= y && y2 <= y + h)))
            return true;
        else
            return false;
    }

    function pickitem(x3, y3, w3, h3, x2, y2, rs) {
        var x = x3;// - rs;
        var y = y3;// - rs;
        var w = w3;// + rs * 2;
        var h = h3;// + rs * 2;
//        context.strokeStyle = "#000";
//        context.strokeRect(x, y, w, h);
//        context.strokeStyle = "red";
//        context.strokeRect(x2, y2, 1, 1);
        if ((x2 >= x && x2 <= x + w) && ((y2 >= y && y2 <= y + h)))
            return true;
        else
            return false;
    }

    function isLoaded() {
        var p = Math.round(((load * 100) / total));
        if (cload < 1) {
            cload += .1;
        } else {
            cload = 0;
        }
        if (load === total) {
            theme.play();
            clearInterval(loop);
            controles();
            loop = setInterval(mainLoop, interval);
            lostsoul.currentTime = 0;
            lostsoul.play();
        } else {
            //Background
            context.fillStyle = "rgba(255,255,255,1)";
            context.fillRect(0, 0, canvas.width, canvas.height);
            print_center("Loading... " + p + "% ", 36, "rgba(0,0,0," + cload + ")");
            context.globalAlpha = p / 100;
            context.drawImage(img_logo, 0, 0, 563, 270, xs - 281, ys - 135, 563, 270);
            context.globalAlpha = 1;
        }
    }

    function blood(qtd, dsp) {
        context.strokeStyle = "red";
        context.strokeRect(xr - (Math.round(Math.random() * dsp)), yr - (Math.round(Math.random() * dsp)), 1, 1);
        context.strokeRect(xr + (Math.round(Math.random() * dsp)), yr + (Math.round(Math.random() * dsp)), 1, 1);
        context.strokeRect(xr - (Math.round(Math.random() * dsp)), yr + (Math.round(Math.random() * dsp)), 1, 1);
        context.strokeRect(xr + (Math.round(Math.random() * dsp)), yr - (Math.round(Math.random() * dsp)), 1, 1);
        for (var i = 0; i < qtd; i++) {
            context.beginPath();
            context.fillStyle = "rgba(255,0,0," + (Math.random() + .5) + ")";
            context.arc(
                    xr + ((Math.round(Math.random())) ? +(Math.round(Math.random() * dsp)) : -(Math.round(Math.random() * dsp))), //Posição X, referência ao centro do círculo;
                    yr + ((Math.round(Math.random())) ? +(Math.round(Math.random() * dsp)) : -(Math.round(Math.random() * dsp))), //Posição Y;
                    (Math.round(Math.random() * 2)), //Raio do círculo;
                    (Math.PI / 180) * 0, //Ângulo inicial, onde começará o traço;
                    (Math.PI / 180) * 180, //Ângulo final, onde termina o traço;
                    false //Sentido do traço, horário (FALSE), anti-horário (TRUE);
                    );
            context.fill(); //Desenha o contorno do círculo
            context.closePath(); //Finaliza o caminho "Path" do desenho atual
        }
    }

    function drawBackground() {
        //Background
        context.fillStyle = context.createPattern(img_back, "repeat");
        ;
        context.fillRect(0, 0, canvas.width, canvas.height);
        //Blood
        for (var i = 0; i < nb1; i++) {
            context.drawImage(img_blood, xb1[i], yb1[i], 100, 100);
        }
        //Blood2
        for (var i = 0; i < nb2; i++) {
            context.drawImage(img_blood2, xb2[i], yb2[i], 100, 100);
        }
        //Corpse1
        for (var i = 0; i < nc1; i++) {
            context.drawImage(img_corpse1, xc1[i], yc1[i], 50, 70);
        }

        //Desenhando os arbustos
        for (var i = 0; i < ngr; i++) {
            context.drawImage(img_pile, xgr[i], ygr[i], 250, 250);
        }
        //box
        context.strokeStyle = "#000000";
        context.strokeRect(0, 0, canvas.width, canvas.height);
    }

    function drawPowerup() {
        c_spritesS++;
        if (c_spritesS > 5)
            c_spritesS = 0;
        context.drawImage(img_powerup, 122 * Math.floor(c_spritesS), 0, 122, 100, xpu, ypu, wpu, hpu);
    }
    
    function spawnPowerup() {
        if (points<maxpoints) {
            xpu[0]= Math.round(Math.random() * (canvas.width - 30));
            ypu[0] = Math.round(Math.random() * (canvas.height - 30));
            drawPowerup();
        }
    }
 
    function drawLostSoul() {
        if (v === 0) {
            context.drawImage(img_lostsoul_h, xr, yr, 80, 50);
        } else if (v === 1) {
            context.drawImage(img_lostsoul_v, xr, yr, 50, 50);
        } else if (d === 1) {
            context.drawImage(img_lostsoul_d, xr, yr, 50, 80);
        }
    }

    function drawMarine() {
        if (state_cb === 'walk') {
            c_sprites++;
            if (c_sprites > 1 && (dir_cb === 'right' || dir_cb === 'left'))
                c_sprites = 0;
            else if (c_sprites > 3)
                c_sprites = 0;

        } else {
            c_sprites = 0;
        }

        if (dir_cb === 'right') {
            context.drawImage(img_marine_r, 42 * Math.floor(c_sprites), 0, 42, 56, xs - 31, ys - 42, 63, 84);
        } else if (dir_cb === 'left') {
            context.drawImage(img_marine_l, 42 * Math.floor(c_sprites), 0, 42, 56, xs - 31, ys - 42, 63, 84);
        } else if (dir_cb === 'up') {
            context.drawImage(img_marine_u, 42 * Math.floor(c_sprites), 0, 42, 56, xs - 31, ys - 42, 63, 84);
        } else if (dir_cb === 'down') {
            context.drawImage(img_marine_d, 42 * Math.floor(c_sprites), 0, 42, 56, xs - 31, ys - 42, 63, 84);
        }    
    }
    
    function drawDeath() {
        if (c_spritesD<6){
            c_spritesD++;
            context.drawImage(img_marine_dead, 50 * Math.floor(c_spritesD), 0, 50, 56, xs - 35, ys - 40, 70, 80);
        } else {
            context.drawImage(img_marine_dead, 50 * Math.floor(c_spritesD), 0, 50, 56, xs - 35, ys - 40, 70, 80);
            print_center("Game Over", 200, 'black');
            clearInterval(loop);    
        }
    }

    function controles() {
        //Evento do teclado com JQuery
        $(window).keydown(function (e) {
            key = e.which;
            if (!dead) {
                if (key === 68) {
                    state_cb = 'walk';
                    dir_cb = 'right';
                } else if (key === 65) {
                    state_cb = 'walk';
                    dir_cb = 'left';
                } else if (key === 87) {
                    state_cb = 'walk';
                    dir_cb = 'up';
                } else if (key === 83) {
                    state_cb = 'walk';
                    dir_cb = 'down';
                }
            }
        });
        //Evento do teclado com JQuery
        $(window).keyup(function (e) {
            state_cb = 'stop';
        });
    }

    function print_center(message, yPosition, fill) {
        context.font = "bold 60px doom";
        context.fillStyle = fill;
        context.textBaseline = "top";
        var metrics = context.measureText(message);
        var textWidth = metrics.width;
        var xPosition = (canvas.width / 2) - (textWidth / 2);
        context.fillText(message, xPosition, yPosition);
    }

}