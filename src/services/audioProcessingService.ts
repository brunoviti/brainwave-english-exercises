
import { Feedback } from "@/components/FeedbackDisplay";
import { generateId } from "@/lib/utils";
import { toast } from "sonner";

// Esta función envía el audio al servicio de procesamiento
export const processAudio = async (audioBlob: Blob): Promise<Feedback[]> => {
  try {
    console.log('Audio blob size:', audioBlob.size, 'bytes');
    
    // Simulamos una API con análisis más detallado
    // En una implementación real, aquí se enviará el archivo a un endpoint de backend
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Analizamos el audio simulando diferentes tipos de problemas
    return generateDetailedFeedback(audioBlob);
  } catch (error) {
    console.error('Error processing audio:', error);
    toast.error('Error al procesar el audio. Por favor intente nuevamente.');
    throw error;
  }
};

// Función para generar feedback detallado basado en el análisis del audio
const generateDetailedFeedback = (audioBlob: Blob): Feedback[] => {
  // Simulamos diferentes tipos de problemas basados en el tamaño del audio
  // Esto simula un análisis más complejo
  const audioLength = audioBlob.size;
  const feedbackItems: Feedback[] = [];
  
  // Errores de pronunciación
  if (audioLength > 1000) {
    feedbackItems.push({
      id: generateId(),
      type: 'pronunciation',
      severity: 'error',
      message: 'Dificultad con el sonido "th" en palabras como "think" y "the"',
      suggestion: 'Coloca la punta de la lengua entre los dientes y sopla aire para hacer el sonido "th" correctamente. Practica con frases como "This thing thinks thoroughly".',
      exercises: 'Ejercicio diario: Repite 10 veces "The thin thimble fits these thumbs" frente al espejo observando la posición de tu lengua.',
      timestamp: 2400,
    });
  }
  
  if (audioLength > 2000) {
    feedbackItems.push({
      id: generateId(),
      type: 'pronunciation',
      severity: 'warning',
      message: 'El sonido de la vocal en "can\'t" es demasiado corto',
      suggestion: 'Alarga ligeramente el sonido "a" para una pronunciación americana natural. Compara: "can" (corto) vs "can\'t" (ligeramente más largo).',
      exercises: 'Practica pares mínimos: "can/can\'t", "man/ant", "pan/pant" prestando atención a la duración de la vocal.',
      timestamp: 4800,
    });
  }
  
  // Errores gramaticales
  if (audioLength > 3000) {
    feedbackItems.push({
      id: generateId(),
      type: 'grammar',
      severity: 'error',
      message: 'Uso incorrecto del tiempo verbal en "I been there"',
      suggestion: 'Utiliza el presente perfecto: "I have been there" o "I\'ve been there". El auxiliar "have" es necesario para formar este tiempo verbal.',
      exercises: 'Completa oraciones: "I ___ never ___ to Paris" (have, been), "She ___ ___ working all day" (has, been).',
      timestamp: 7200,
    });
  }
  
  // Entonación y ritmo
  if (audioLength > 4000) {
    feedbackItems.push({
      id: generateId(),
      type: 'pronunciation',
      severity: 'info',
      message: 'Entonación plana al hacer preguntas',
      suggestion: 'En inglés, las preguntas de sí/no generalmente terminan con entonación ascendente, mientras que las preguntas informativas (con wh-) suelen tener entonación descendente.',
      exercises: 'Practica estas preguntas exagerando la entonación: "Are you coming?" (↗), "Where do you live?" (↘).',
      timestamp: 10500,
    });
  }
  
  // Puntos positivos
  feedbackItems.push({
    id: generateId(),
    type: 'general',
    severity: 'success',
    message: 'Buen ritmo y fluidez en general',
    suggestion: 'Continúa practicando este ritmo natural en oraciones más largas. Intenta leer en voz alta extractos de libros o noticias.',
    exercises: 'Graba tu voz leyendo un párrafo corto y compáralo con hablantes nativos. Identifica pausas y énfasis similares.',
  });
  
  return feedbackItems;
};

// Función para transcribir el audio
export const transcribeAudio = async (audioBlob: Blob): Promise<string> => {
  // Simulamos el proceso de transcripción
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const audioLength = audioBlob.size;
  let transcription = "Esta es una transcripción de muestra. ";
  
  // Generamos una transcripción diferente según el tamaño del audio
  if (audioLength < 2000) {
    transcription += "La grabación es muy corta. Intenta hablar un poco más para obtener un mejor análisis.";
  } else if (audioLength < 4000) {
    transcription += "I think that I been to that place before. I cant remember exactly when.";
  } else {
    transcription += "I think that I have been to that place before. I can't remember exactly when. The weather was nice and we visited many interesting places during our trip.";
  }
  
  return transcription;
};
