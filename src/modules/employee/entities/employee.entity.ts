import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ schema: 'SENIOR', name: 'USU_VCOLATISAP' })
export class Employee {
  @PrimaryColumn({ name: 'COD_MATRIC_LEGAD' })
  legacyMatriculation: number;

  @Column({ name: 'NOM_COLABO' })
  firstName: string;

  @Column({ name: 'NOM_MEIO_COLABO' })
  middleName: string;

  @Column({ name: 'DES_SOBREN' })
  lastName: string;

  @Column({ name: 'NOM_EMPRES_LEGAD' })
  legacyCompany: number;

  @Column({ name: 'NOM_FILIAL_LEGAD' })
  legacyBranch: number;

  @Column({ name: 'DAT_ADMISS' })
  admissionDate: string;

  @Column({ name: 'COD_UNIDAD_ORGANI_LEGAD' })
  legacyOrganizationalUnitCode: string;

  @Column({ name: 'NOM_UNIDAD_ORGANI_LEGAD' })
  legacyOrganizationalUnitText: string;

  @Column({ name: 'COD_CARGO' })
  positionType: string;

  @Column({ name: 'GESTOR_UO' })
  isOrganizationalUnitManager: string;

  @Column({ name: 'GESTOR_POSTRA' })
  higherOrganizationalUnitCode: string;

  @Column({ name: 'GESTOR_DESPOS' })
  higherOrganizationalUnitText: string;

  @Column({ name: 'UO_RAIZ' })
  organizationalUnitRoot: string;

  @Column({ name: 'DES_EMAIL_CORP' })
  corporateEmail: string;

  // Getter para nome completo conforme DOC
  get firstAndMiddleName(): string {
    return `${this.firstName} ${this.middleName}`;
  }
}
