export enum PositionType {
  DIRECTOR = 'DI',
  MANAGER = 'GE',
  COORDINATOR = 'CO',
  EMPLOYEE = 'EM',
  TRAINEE = 'ES',
}
export const positionTypeLabels: Record<PositionType, string> = {
  [PositionType.DIRECTOR]: 'Diretor',
  [PositionType.MANAGER]: 'Gerente',
  [PositionType.COORDINATOR]: 'Coordenador',
  [PositionType.EMPLOYEE]: 'Funcionário',
  [PositionType.TRAINEE]: 'Estagiário/Trainee',
};

export enum OrganizationalUnitManager {
  YES = 'S',
  NO = 'N',
}
export const organizationalUnitManagerLabels: Record<
  OrganizationalUnitManager,
  string
> = {
  [OrganizationalUnitManager.YES]: 'Sim',
  [OrganizationalUnitManager.NO]: 'Não',
};
