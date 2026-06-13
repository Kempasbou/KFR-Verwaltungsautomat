import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FieldRow from '../FieldRow.jsx';
import { FIELDS } from '../../lib/fields.js';

const fieldFor = (key) => FIELDS.find((f) => f.key === key);

describe('FieldRow', () => {
  it('zeigt Label, Spaltenbuchstabe und Pflichtmarkierung', () => {
    render(
      <FieldRow field={fieldFor('firstName')} value="Max" error={null}
                corrected={false} onChange={() => {}} />
    );
    expect(screen.getByText('Vorname')).toBeInTheDocument();
    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Max')).toBeInTheDocument();
  });

  it('meldet Texteingaben über onChange', async () => {
    const onChange = vi.fn();
    render(
      <FieldRow field={fieldFor('city')} value="" error={null}
                corrected={false} onChange={onChange} />
    );
    await userEvent.type(screen.getByRole('textbox'), 'A');
    expect(onChange).toHaveBeenCalledWith('A');
  });

  it('zeigt Fehlermeldung bei ungültigem Feld', () => {
    render(
      <FieldRow field={fieldFor('email')} value="kaputt"
                error="Bitte eine gültige E-Mail-Adresse eingeben."
                corrected={false} onChange={() => {}} />
    );
    expect(screen.getByText(/gültige E-Mail/)).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
  });

  it('Aktiv/Passiv als segmentierte Auswahl, meldet Klick', async () => {
    const onChange = vi.fn();
    render(
      <FieldRow field={fieldFor('membershipType')} value="Aktiv" error={null}
                corrected={false} onChange={onChange} />
    );
    const passiv = screen.getByRole('button', { name: 'Passiv' });
    expect(screen.getByRole('button', { name: 'Aktiv' })).toHaveAttribute('aria-pressed', 'true');
    await userEvent.click(passiv);
    expect(onChange).toHaveBeenCalledWith('Passiv');
  });

  it('zeigt „manuell korrigiert" wenn fehlerfrei und korrigiert', () => {
    render(
      <FieldRow field={fieldFor('lastName')} value="Müller" error={null}
                corrected={true} onChange={() => {}} />
    );
    expect(screen.getByText(/manuell korrigiert/)).toBeInTheDocument();
  });
});
