#Include 'protheus.ch'
#Include 'FWMVCDef.ch'

User Function Tarefa()
Return

Static Function ModelDef()
  Local oModel := MPFormModel():New("MTarefa")
  Local oStruct := FWFormStruct( 1, "Z01" )
	oModel:SetDescription("Tarefas")
	oModel:AddFields('MASTER',,oStruct)
	oModel:SetPrimaryKey({})
	oModel:GetModel('MASTER'):SetDescription('Tarefas')
Return oModel
