import type {AddChordDefinition,AddExamplePosition,AddSubtype} from './a-minor-types';

const specs={
  add9:{qualityLabel:'Major add9 chord',formulaDegrees:['1','3','5','9'],semitonesFromRoot:[0,4,7,2]},
  minorAdd9:{qualityLabel:'Minor add9 chord',formulaDegrees:['1','b3','5','9'],semitonesFromRoot:[0,3,7,2]},
} as const;
const labels=['Added note higher (9th layout)','Added note lower (2nd layout)'];
const same=(a:unknown,b:unknown)=>JSON.stringify(a)===JSON.stringify(b);

export function resolveAddDefinition(subtype:AddSubtype):AddChordDefinition{
 const spec=specs[subtype];
 return{family:'add',subtype,familyLabel:'Added-note chord',qualityLabel:spec.qualityLabel,
  formulaDegrees:[...spec.formulaDegrees],semitonesFromRoot:[...spec.semitonesFromRoot],expectedNoteCount:4,expectedPositionCount:2,
  exampleLabels:[...labels],categoryRoute:'/chords/add',categoryLabel:'Add Chords'};
}
export function validateAddDefinition(definition:AddChordDefinition){
 const expected=resolveAddDefinition(definition.subtype);
 if(definition.family!=='add'||definition.familyLabel!==expected.familyLabel||definition.qualityLabel!==expected.qualityLabel||definition.expectedNoteCount!==4||definition.expectedPositionCount!==2||definition.categoryRoute!=='/chords/add'||definition.categoryLabel!=='Add Chords'||!same(definition.formulaDegrees,expected.formulaDegrees)||!same(definition.semitonesFromRoot,expected.semitonesFromRoot)||!same(definition.exampleLabels,expected.exampleLabels))throw new Error(`Invalid ${definition.subtype} add definition`);
}
export function positionForAdd(definition:AddChordDefinition,index:number,notationHint:string):AddExamplePosition{
 if(index!==0&&index!==1)throw new Error(`Invalid ${definition.subtype} example index: ${index}`);
 return{kind:'example',exampleIndex:index,label:definition.exampleLabels[index],bassDegree:'1',notationHint};
}
