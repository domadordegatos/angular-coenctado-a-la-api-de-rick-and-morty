import { CharacterService } from './../../../../shared/services/character.service';
import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { CharacterI } from 'src/app/shared/interface/character.interface';
import { take, filter } from 'rxjs/operators';
import { Router, ParamMap, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { DOCUMENT } from  '@angular/common';
type RequestInfo = {
  next : string;
}
@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss']
})
export class CharacterListComponent implements OnInit {

  info: RequestInfo = {
    next: null,
  }
  characters : CharacterI[] = [];
  showGoUpButton = false;
  private pageNum = 1;
  private query : string;
  private hideScrollHeight = 200;
  private showScrollHeight = 500;


  constructor(@Inject(DOCUMENT) private document:Document, private characterSvc: CharacterService, private route:ActivatedRoute, private router:Router) {
    this.onUrlChange();
   }

  ngOnInit(): void {
    this.getDataFromSvc();
    this.getCharacters();
  }

  @HostListener('window:scroll',[])
  onWindowScroll():void{
    const yOffSet = window.pageYOffset;
    if((yOffSet || this.document.documentElement.scrollTop || this.document.body.scrollTop)> this.showScrollHeight){
      this.showGoUpButton = true;
    }else if (this.showGoUpButton && (yOffSet || this.document.documentElement.scrollTop || this.document.body.scrollTop) < this.hideScrollHeight){
      this.showGoUpButton = false;
    }
  }


  onScrollDown():void{
    if(this.info.next){
      this.pageNum++;
      this.getDataFromSvc();
    }
  }
  onScrollTop():void{
    this.document.body.scrollTop = 0;
    this.document.documentElement.scrollTop = 0;
  }


  private onUrlChange(){
    this.router.events.pipe(filter((event)=>event instanceof NavigationEnd))
    .subscribe(()=>{
      this.characters = [];
      this.pageNum = 1;
      this.getCharacters();
    })
  }

  private getCharacters(): void{
    this.route.queryParams.pipe(take(1)).subscribe((params:ParamMap)=>{
      console.log("param=>",params);
      this.query = params['q'];
      this.getDataFromSvc();
    })
  }

  private getDataFromSvc():void{
    this.characterSvc.searchCharacters(this.query, this.pageNum)
    .pipe(take(1))
    .subscribe((res:any)=>{
      if(res?.results?.length){
        const { info, results } = res; 
        this.characters = [...this.characters, ...results];
        this.info = info;
      }else{
        this.characters = []
      }
    })
  }
}
