const{src, dest, watch,series} = require('gulp');

// CSS y SASS
const sass = require('gulp-sass') (require ('sass'));
const postcss = require ('gulp-postcss');
const autoprefixer= require('autoprefixer');

// Imagenes
//const imagemin = require('gulp-imagemin'); no instalar pq no me sale
const webp = require('gulp-webp');
const avif = require('gulp-avif');

function css( done){
    src('src/saas/scss/estilos.scss')
        .pipe( sass({outputStyle: 'expanded' }) )
        .pipe( postcss([autoprefixer()]))
        .pipe( dest('src/build/css') )

        done();
    }

function imagenes() {
        return src('src/img/**/*')
       
        .pipe( dest('src/build/img') )
    }

    function versionWebp() {
        const opciones = {
            quality: 50
        }
        return src('src/img/**/*.{png,jpg}')
            .pipe( webp( opciones ) )
            .pipe( dest('src/build/img') )
    }
    function versionAvif() {
        const opciones = {
            quality: 50
        }
        return src('src/img/**/*.{png,jpg}')
            .pipe( avif( opciones ) )
            .pipe( dest('src/build/img'))
    }


function dev(){
          watch('src/saas/scss/**/*.scss', css)
          watch( 'src/img/**/*', imagenes );
        

}
exports.css= css;
exports.dev= dev;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.default= series(imagenes, versionWebp,versionAvif,css, dev);
