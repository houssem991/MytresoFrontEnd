import { Component, OnInit } from '@angular/core';
import {FactureService} from '../../../shared/services/facture.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-detail-facture-fournisseurs',
  templateUrl: './detail-facture-fournisseurs.component.html',
  styleUrls: ['./detail-facture-fournisseurs.component.scss']
})
export class DetailFactureFournisseursComponent implements OnInit {
  facture: any;
  ligne: any;
  piece: any;
  constructor(private factureService: FactureService, private router: Router, private route: ActivatedRoute) {
    // Récupère les données

  }
getFacture(piece) {
    this.factureService.getFactureFournisseur(piece).subscribe(data => {
      this.facture = data;
      console.log("facture" , this.facture)
      this.ligne = this.facture.ligneFactures;
      console.log("ligne" , this.ligne)
    })
}
  printTable() {
    const printableContent = document.getElementById('print');
    const originalContent = document.body.innerHTML;

    // Afficher la vue imprimable
    printableContent.style.display = 'block';

    // Masquer le reste du contenu
    document.body.innerHTML = printableContent.innerHTML;

    window.print();

    // Restaurer le contenu original
    document.body.innerHTML = originalContent;

    // Masquer à nouveau la vue imprimable
    printableContent.style.display = 'none';
  }
  ngOnInit(): void {
    this.piece = this.route['params']['value']['id'];
    this.getFacture(this.piece)
  }

}
