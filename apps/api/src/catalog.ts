export const levels = [{ id: 'secundaria', name: 'Secundaria' }, { id: 'universidad', name: 'Universidad' }, { id: 'oposicion', name: 'Preparación de oposiciones' }];
export const subjects = [{ id: 'matematicas', name: 'Matemáticas' }, { id: 'fisica', name: 'Física' }];
export const avatars = ['Explorador', 'Astronauta', 'Inventora', 'Botánico', 'Navegante', 'Artista'].map((name, i) => ({ id: `avatar-${i+1}`, name, asset: `/avatars/avatar-${i+1}.svg` }));
export const compatible = (level: string, subject: string) => subject === 'matematicas' || (subject === 'fisica' && level !== 'oposicion');

// Contenido original del proyecto. Generación determinista y explicaciones verificables.
export const pilotQuestions = subjects.flatMap(subject => Array.from({ length: 12 }, (_, i) => {
 const a=i+2, b=i%4+2, physics=subject.id==='fisica';
 const correct=a*b, index=i%4;
 const options=[String(correct+1),String(correct-1),String(correct+2),String(correct-2)];options[index]=String(correct);
 return { subjectId:subject.id, topic:physics?'Movimiento uniforme':'Multiplicación', difficulty:i<4?1:i<8?2:3,
  prompt:physics?`Un móvil recorre una trayectoria rectilínea a velocidad constante de ${a} m/s durante ${b} s. ¿Qué distancia recorre en metros?`:`¿Cuánto es ${a} × ${b}?`,
  options, correctIndex:index, explanation:physics?`Con velocidad constante, distancia = velocidad × tiempo = ${a} m/s × ${b} s = ${correct} m.`:`Multiplicar ${a} por ${b} da ${correct}. Se puede comprobar sumando ${a} un total de ${b} veces.`,
  source:'Contenido original RankStudy, piloto de aritmética y movimiento uniforme', license:'CC0-1.0' };
}));
