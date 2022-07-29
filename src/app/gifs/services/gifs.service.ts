

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';


@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey      : string    = '6Dd45olvR5UzXTz2JrR9tZ4elLiGokLV';
  private servicioUrl : string    = 'http://api.giphy.com/v1/gifs';
  private _historial  : string[] = [];

  public resultados : Gif [] = [];

  get historial() {

    return [...this._historial];
  }

  constructor ( private http: HttpClient ) {

    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];


    //if ( localStorage.getItem('historial')) {
    //  this._historial = JSON.parse( localStorage.getItem('historial')! );}

  }

  buscarGifs( query: string = '' ) {

    query = query.trim().toLocaleLowerCase();

    if ( !this._historial.includes( query ) ) {
      this._historial.unshift( query );
      this._historial = this._historial.splice(0,20);
      localStorage.setItem( 'historial', JSON.stringify( this._historial ) );

    }

    const params = new HttpParams ()
        .set( 'api_key', this.apiKey )
        .set( 'limit','20')
        .set( 'q', query );


    this.http.get<SearchGifsResponse> (`${ this.servicioUrl }/search`, { params })
      .subscribe(( resp ) =>{
          this.resultados = resp.data;
          localStorage.setItem( 'resultados', JSON.stringify( this.resultados) );
        });

        // Esta es otra forma de hacer el llamado del http con funcionalidades de Javascripts
    //fetch ('http://api.giphy.com/v1/gifs/search?api_key=6Dd45olvR5UzXTz2JrR9tZ4elLiGokLV&q=Dragon Ball z&limit=10')
      //.then( resp =>{
        //resp.json().then(data => {
          //console.log(data);})
      //})
  }

}


