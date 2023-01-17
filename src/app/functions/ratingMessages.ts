export function getRatingMessages(mediaNota:any){
  if(mediaNota > 4){
    return 'Excelente! Presta Serviços com qualidade e dentro do prazo.'
  }
  if(mediaNota > 3){
    return 'Muito Bom! Presta serviços com qualidade.'
  }
  if(mediaNota > 2){
    return 'Bom! Presta bom serviços.'
  }
  if(mediaNota > 1){
    return 'Ruim! Presta serviços com qualidade e prazos abaixo do esperado.'
  }
  if(mediaNota > 0){
    return 'Pessimo! Presta serviços muito abaixo do que é esperado pelos clientes.'
  }
  else{
    return 'Este prestador de serviços ainda não possui nenhuma avaliação.'
  }
}
