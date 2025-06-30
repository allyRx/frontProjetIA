import React, { useState, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import 'regenerator-runtime/runtime'; // Nécessaire pour react-speech-recognition

interface RecordedVoice {
  name: string;
  phrase: string;
}

const VoiceRecorder: React.FC = () => {
  const [userName, setUserName] = useState<string>('');
  const [recordedVoices, setRecordedVoices] = useState<RecordedVoice[]>([]);
  const [feedbackMessage, setFeedbackMessage] = useState<string>('');

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable,
  } = useSpeechRecognition();

  useEffect(() => {
    // Charger les voix enregistrées depuis le LocalStorage au montage
    const storedVoices = localStorage.getItem('recordedVoices');
    if (storedVoices) {
      setRecordedVoices(JSON.parse(storedVoices));
    }
  }, []);

  useEffect(() => {
    // Sauvegarder les voix dans le LocalStorage à chaque modification
    localStorage.setItem('recordedVoices', JSON.stringify(recordedVoices));
  }, [recordedVoices]);

  if (!browserSupportsSpeechRecognition) {
    return <div className="text-red-500">Votre navigateur ne supporte pas la reconnaissance vocale. Essayez Chrome.</div>;
  }

  const handleStartListening = () => {
    resetTranscript();
    setFeedbackMessage('');
    SpeechRecognition.startListening({ continuous: false, language: 'fr-FR' });
  };

  const handleStopListening = () => {
    SpeechRecognition.stopListening();
  };

  const handleSaveVoice = () => {
    if (!userName.trim()) {
      setFeedbackMessage('Veuillez entrer un nom pour l\'enregistrement.');
      return;
    }
    if (!transcript.trim()) {
      setFeedbackMessage('Aucune phrase enregistrée. Veuillez parler avant de sauvegarder.');
      return;
    }

    const newVoice: RecordedVoice = { name: userName, phrase: transcript.trim() };
    setRecordedVoices([...recordedVoices, newVoice]);
    setFeedbackMessage(`Voix de ${userName} enregistrée avec la phrase : "${transcript.trim()}"`);
    resetTranscript();
    // setUserName(''); // Optionnel: réinitialiser le nom après l'enregistrement
  };

  const handleTestVoice = () => {
    if (!transcript.trim()) {
      setFeedbackMessage('Aucune phrase à tester. Veuillez parler avant de tester.');
      return;
    }

    const currentPhrase = transcript.trim();
    const matchedVoice = recordedVoices.find(voice => voice.phrase.toLowerCase() === currentPhrase.toLowerCase());

    if (matchedVoice) {
      setFeedbackMessage(`Voix reconnue : ${matchedVoice.name} (Phrase : "${currentPhrase}")`);
    } else {
      setFeedbackMessage(`Voix non reconnue. Phrase testée : "${currentPhrase}"`);
    }
    // Ne pas réinitialiser le transcript ici pour que l'utilisateur voie ce qui a été testé
  };

  return (
    <div className="p-4 max-w-lg mx-auto bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-700">Enregistrement & Test Vocal</h2>

      {!isMicrophoneAvailable && (
        <p className="text-red-500 text-center mb-4">
          L'accès au microphone est requis. Veuillez autoriser l'accès dans votre navigateur.
        </p>
      )}

      <div className="mb-4">
        <label htmlFor="userName" className="block text-sm font-medium text-gray-700 mb-1">
          Votre Nom :
        </label>
        <input
          type="text"
          id="userName"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Entrez votre nom"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      <div className="mb-4 p-3 border border-gray-200 rounded-md min-h-[60px] bg-gray-50">
        <p className="text-sm text-gray-600">Microphone : {listening ? <span className="text-green-500 font-semibold">Activé</span> : <span className="text-red-500 font-semibold">Désactivé</span>}</p>
        <p className="text-md text-gray-800 italic">{transcript || "En attente de parole..."}</p>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={handleStartListening}
          disabled={listening}
          className="flex-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
        >
          Commencer l'enregistrement
        </button>
        <button
          onClick={handleStopListening}
          disabled={!listening}
          className="flex-1 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
        >
          Arrêter l'enregistrement
        </button>
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={resetTranscript}
          className="flex-1 bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded"
        >
          Réinitialiser le texte
        </button>
        <button
          onClick={handleSaveVoice}
          disabled={listening || !transcript.trim() || !userName.trim()}
          className="flex-1 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
        >
          Enregistrer la Voix Associée au Nom
        </button>
      </div>
       <div className="mb-4">
        <button
          onClick={handleTestVoice}
          disabled={listening || !transcript.trim()}
          className="w-full bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
        >
          Tester la Voix Actuelle
        </button>
      </div>

      {feedbackMessage && (
        <p className={`mt-4 text-sm ${feedbackMessage.startsWith('Voix reconnue') || feedbackMessage.startsWith('Voix de') ? 'text-green-600' : 'text-red-600'}`}>
          {feedbackMessage}
        </p>
      )}

      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Voix Enregistrées :</h3>
        {recordedVoices.length > 0 ? (
          <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
            {recordedVoices.map((voice, index) => (
              <li key={index}>
                <strong>{voice.name}:</strong> "{voice.phrase}"
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500">Aucune voix enregistrée pour le moment.</p>
        )}
      </div>
    </div>
  );
};

export default VoiceRecorder;
