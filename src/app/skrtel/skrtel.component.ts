import { Component, OnInit } from '@angular/core';
// import {MatTooltipModule} from '@angular/material/tooltip';
import * as XLSX from 'ts-xlsx';
import { IPlayer } from './player';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { WinnerDialogComponent } from '../winner-dialog/winner-dialog.component';
import { InfoDialogComponent } from '../info-dialog/info-dialog.component';
import { MenuDialogComponent } from '../menu-dialog/menu-dialog.component';
import { InstructionDialogComponent } from '../instruction-dialog/instruction-dialog.component';

@Component({
  selector: 'app-skrtel',
  templateUrl: './skrtel.component.html',
  styleUrls: ['./skrtel.component.scss'],
})
export class SkrtelComponent implements OnInit {
  guessedPlayer: IPlayer = {
    name: 'N/A',
    age: 0,
    jersey: 0,
    team: 'N/A',
    league: 'N/A',
    nation: 'N/A',
    position: 'N/A',
    positionGroup: 'NA',
    continent: 'NA',
    possibleAnswer: 'no',
    difficulty: 3,
  };
  guessName: any;
  correctPlayer: IPlayer | undefined;
  winner: boolean = false;
  playerFound: boolean = false;
  showAnswer: boolean = false;
  playerList: IPlayer[] = [];
  gotTeam: string = 'grey';
  gotPosition: string = 'grey';
  gotCountry: string = 'grey';
  gotAge: string = 'NA';
  arrayBuffer: any;
  gameDifficulty: number = 2;
  file: File;
  sheet: any;
  prevGuess: any = [];
  possibleLeagues: string[] = [
    'Premier League',
    'La Liga',
    'Ligue 1',
    'Bundesliga',
    'Serie A',
  ];

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  openMenuDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;

    dialogConfig.minWidth = '400px';

    const dialogRef = this.dialog.open(MenuDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((data) => this.menuChanges(data));
  }

  openInstructionDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '400px';

    this.dialog.open(InstructionDialogComponent, dialogConfig);
  }

  menuChanges(data: any) {
    this.possibleLeagues = data?.leagues;
    console.log(this.possibleLeagues);

    this.gameDifficulty = data?.difficulty;
    console.log(data?.difficulty);
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    this.dialog.open(WinnerDialogComponent, dialogConfig);
  }

  openInfoDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    this.dialog.open(InfoDialogComponent, dialogConfig);
  }

  newGame() {
    this.showAnswer = false;
    this.prevGuess = [];
    this.gotCountry = 'grey';
    this.gotPosition = 'grey';
    this.winner = false;
    this.gotTeam = 'grey';
    this.guessedPlayer = {
      name: 'N/A',
      age: 0,
      jersey: 0,
      team: 'N/A',
      league: 'N/A',
      nation: 'N/A',
      position: 'N/A',
      positionGroup: 'NA',
      continent: 'NA',
      possibleAnswer: 'no',
      difficulty: 1,
    };
    this.gotAge = 'NA';
  }

  guess(guess: string) {
    if (this.findGuess(guess).team != 'NA') {
      this.playerFound = true;
      this.guessedPlayer = this.findGuess(guess);
      this.checkPlayer();
      this.prevGuess.push({
        player: this.guessedPlayer,
        gotTeam: this.gotTeam,
        gotPosition: this.gotPosition,
        gotCountry: this.gotCountry,
        gotAge: this.gotAge,
      });
    }
  }

  generatePlayer() {
    this.newGame();
    // this.correctPlayer = this.playerList[Math.random() * this.playerList.length];
    var max = Math.floor(this.playerList.length);
    var playerIDX = Math.floor(Math.random() * max);
    // if(this.playerList[playerIDX].nation == "Raheem Sterling"){
    if (
      this.checkGeneratedPlayerLeague(this.playerList[playerIDX]) &&
      this.checkGeneratedPlayerDifficulty(this.playerList[playerIDX])
    ) {
      this.correctPlayer = this.playerList[playerIDX];
      console.log(this.correctPlayer);
    } else {
      this.generatePlayer();
    }
  }

  checkGeneratedPlayerLeague(player: IPlayer) {
    return this.possibleLeagues.includes(player.league);
  }

  checkGeneratedPlayerDifficulty(player: IPlayer) {
    return this.gameDifficulty >= player.difficulty;
  }

  checkPlayer() {
    if (this.correctPlayer?.name == this.guessedPlayer?.name) {
      this.showAnswer = true;
      this.winner = true;
      this.gotCountry = 'green';
      this.gotPosition = 'green';
      this.gotTeam = 'green';
      this.openDialog();
    } else if (this.correctPlayer && this.guessedPlayer) {
      this.checkTeam();
      this.checkPosition();
      this.checkCountry();
      this.checkAge();
    } else {
    }
  }

  checkTeam() {
    if (this.correctPlayer?.league === this.guessedPlayer?.league) {
      this.gotTeam = 'yellow';
    } else {
      this.gotTeam = 'red';
    }
    if (this.correctPlayer?.team === this.guessedPlayer?.team) {
      this.gotTeam = 'green';
    }
  }

  checkCountry() {
    if (this.correctPlayer?.continent === this.guessedPlayer?.continent) {
      this.gotCountry = 'yellow';
    } else {
      this.gotCountry = 'red';
    }
    if (this.correctPlayer?.nation === this.guessedPlayer?.nation) {
      this.gotCountry = 'green';
    }
  }

  checkPosition() {
    if (
      this.correctPlayer?.positionGroup === this.guessedPlayer?.positionGroup
    ) {
      this.gotPosition = 'yellow';
    } else {
      this.gotPosition = 'red';
    }
    if (this.correctPlayer?.position === this.guessedPlayer?.position) {
      this.gotPosition = 'green';
    }
  }

  checkAge() {
    if (this.correctPlayer?.age === this.guessedPlayer?.age) {
      this.gotAge = 'correct';
    } else if (
      this.correctPlayer &&
      this.correctPlayer.age > this.guessedPlayer?.age
    ) {
      this.gotAge = 'Answer is older';
    } else {
      this.gotAge = 'Answer is younger';
    }
  }

  findGuess(guess: string) {
    for (let i = 0; i < this.playerList.length; i++) {
      if (this.playerList[i].name.toLowerCase().includes(guess.toLowerCase())) {
        return this.playerList[i];
      }
    }
    return {
      name: 'Playerr not found',
      age: 0,
      jersey: 0,
      team: 'NA',
      league: 'NA',
      nation: 'NA',
      position: 'NA',
      positionGroup: 'NA',
      continent: 'NA',
      possibleAnswer: 'no',
      difficulty: 3,
    };
  }

  showCorrectPlayer() {
    this.showAnswer = !this.showAnswer;
  }

  incomingfile(event: any) {
    console.log(event.target.files[0]);
    this.file = event.target.files[0];
  }

  Upload() {
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.arrayBuffer = fileReader.result;
      var data = new Uint8Array(this.arrayBuffer);
      var arr = new Array();
      for (var i = 0; i != data.length; ++i)
        arr[i] = String.fromCharCode(data[i]);
      var bstr = arr.join('');
      var workbook = XLSX.read(bstr, { type: 'binary' });
      var first_sheet_name = workbook.SheetNames[0];
      var worksheet = workbook.Sheets[first_sheet_name];
      console.log(XLSX.utils.sheet_to_json(worksheet, { raw: true }));
      this.sheet = XLSX.utils.sheet_to_json(worksheet, { raw: true });
    };
    fileReader.readAsArrayBuffer(this.file);
    this.generatePlayerList();
  }

  generatePlayerList() {
    for (var i = 0; i < this.sheet.length; i++) {
      this.playerList.push({
        name: this.sheet[i].name,
        age: this.sheet[i].age,
        team: this.sheet[i].club,
        nation: this.sheet[i].nationality,
        league: this.sheet[i].league,
        continent: this.sheet[i].continent,
        positionGroup: this.sheet[i].positionGroup,
        position: this.sheet[i].position,
        possibleAnswer: this.sheet[i].possibleAnswer,
        difficulty: this.sheet[i].difficulty,
      });
    }
    console.log(this.playerList);
  }
}
