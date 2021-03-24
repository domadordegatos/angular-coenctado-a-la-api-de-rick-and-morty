import { TrackHttpError } from './../../../../shared/models/trackHttpError';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CharacterService } from 'src/app/shared/services/character.service';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { CharacterI } from 'src/app/shared/interface/character.interface';
import { Route } from '@angular/compiler/src/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.scss']
})
export class CharacterDetailsComponent implements OnInit {

  character$: Observable<CharacterI | TrackHttpError>;

  constructor(private route:ActivatedRoute, private characterSvc:CharacterService, private location:Location) { }

  ngOnInit(): void {
    this.route.params.pipe(take(1)).subscribe((params)=>{
      const id  = params['id'];
      this.character$ = this.characterSvc.getDetails(id);
    })
  }

  onGoBack(){
    this.location.back();
  }

  
}
