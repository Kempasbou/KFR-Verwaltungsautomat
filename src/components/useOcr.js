import { useState, useCallback } from 'react';
import Tesseract from 'tesseract.js';
import { parseOcrText, ocrFillRatio } from '../lib/ocrParse.js';
import { FIELD_KEYS } from '../lib/fields.js';

// Kapselt die Tesseract-Erkennung. Gibt Status, Fortschritt und das Ergebnis
// zurück. Die eigentliche Parsing-Logik liegt in der getesteten lib/ocrParse.
export function useOcr() {
  const [status, setStatus] = useState('idle'); // idle | running | done | error
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);

  const recognize = useCallback(async (imageSource) => {
    setStatus('running');
    setProgress(0);
    setError(null);
    try {
      const { data } = await Tesseract.recognize(imageSource, 'deu', {
        logger: (m) => {
          if (m.status === 'recognizing text' && typeof m.progress === 'number') {
            setProgress(Math.round(m.progress * 100));
          }
        },
      });
      const record = parseOcrText(data.text);
      const ratio = ocrFillRatio(record, FIELD_KEYS);
      setStatus('done');
      return { record, rawText: data.text, fillRatio: ratio };
    } catch (e) {
      setError(e?.message || 'Die Texterkennung ist fehlgeschlagen.');
      setStatus('error');
      return null;
    }
  }, []);

  const reset = useCallback(() => {
    setStatus('idle');
    setProgress(0);
    setError(null);
  }, []);

  return { status, progress, error, recognize, reset };
}
