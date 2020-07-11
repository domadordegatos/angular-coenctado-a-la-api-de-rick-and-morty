import { CharacterI } from './../../../shared/interface/character.interface';
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector:'app-character',
    template: `
    <div class="card">
    <div class="image">
        <a href="/character-details/{{character.id}}">
            <img [src]="character.image" [alt]="character.name" class="card-img-top">
        </a>
    </div>
    <div class="card-inner">
        <div class="header">
            <a style="text-decoration: none;" href="/character-details/{{character.id}}">
                <h2>{{character.name | slice: 0:15}} </h2>
            </a>
            <h4 class="text-muted">{{character.gender}}</h4>
            <small class="text-muted">{{character.created | date}}</small>
        </div>
    </div>
</div>`,
changeDetection: ChangeDetectionStrategy.OnPush
})

export class CharacterComponent{
    @Input() character:CharacterI;
}