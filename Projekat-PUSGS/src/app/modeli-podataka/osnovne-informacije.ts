export interface OsnovneInformacije {
    id: string;
    tip: string;
    prioritet: number;
    potvrdjen: boolean;
    status: string;
    eta: string;
    ata: string;
    etr: string;
    afektovaniPotrosaci: number;
    brojPoziva: number;
    nivoNapona: number;
    pvr: string; //planirano vreme pocetka rada na otklanjanju incidenta
    dodeliSebiResavanje: boolean;    
}