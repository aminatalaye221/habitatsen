import { useEffect, useMemo, useState } from 'react';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api';

function PlanCard({ plan, onOpenDetails }) {
  const [customMessage, setCustomMessage] = useState('');
  const defaultText = `Bonjour, je suis intéressé par le plan "${plan.title}" (${plan.category}, ${plan.surface}, ${plan.rooms} chambres). Je veux l'envoyer sur WhatsApp et je souhaite plus d'informations.`;
  const whatsappText = customMessage
    ? `Bonjour, je suis intéressé par le plan "${plan.title}". ${customMessage}`
    : defaultText;
  const modifyText = customMessage
    ? `Bonjour, je souhaite modifier le plan "${plan.title}". ${customMessage}`
    : `Bonjour, je souhaite modifier le plan "${plan.title}". Je voudrais un design similaire, mais adapté avec ${plan.rooms} chambres, budget ${Number(plan.price).toLocaleString('fr-FR')} FCFA et des détails locaux.`;

  return (
    <article className="plan-card">
      <img src={plan.image_url || 'https://via.placeholder.com/320x220'} alt={plan.title} />
      <div className="card-content">
        <h3>{plan.title}</h3>
        <p>{plan.description}</p>
        <div className="plan-meta">
          <span>{plan.category.charAt(0).toUpperCase() + plan.category.slice(1)}</span>
          <span>{plan.surface}</span>
          <span>{plan.rooms} chambres</span>
        </div>
        <p className="plan-note">Plan détaillé, conçu à partir d'une étude de marché sénégalaise et pensé pour le climat local.</p>
        <label className="custom-message-label">
          Message personnalisé pour WhatsApp
          <textarea
            value={customMessage}
            onChange={(event) => setCustomMessage(event.target.value)}
            placeholder="Écrivez ici ce que vous voulez changer ou préciser..."
          />
        </label>
        <div className="plan-footer">
          <strong>À partir de {Number(plan.price).toLocaleString('fr-FR')} FCFA</strong>
          <div className="button-group">
            <button type="button" className="details-button" onClick={() => onOpenDetails(plan)}>
              Voir le plan complet
            </button>
            <a
              className="whatsapp-button"
              href={`https://wa.me/?text=${encodeURIComponent(whatsappText)}`}
              target="_blank"
              rel="noreferrer"
            >
              Envoyer sur WhatsApp
            </a>
            <a
              className="secondary-button"
              href={`https://wa.me/?text=${encodeURIComponent(modifyText)}`}
              target="_blank"
              rel="noreferrer"
            >
              Demander modification
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}

function App() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchQuery, setSearchQuery] = useState('');
  const [minBudget, setMinBudget] = useState('');
  const [maxBudget, setMaxBudget] = useState('');

  useEffect(() => {
    fetch(`${API_BASE}/plans/`)
      .then((response) => response.json())
      .then((data) => {
        setPlans(data);
      })
      .finally(() => setLoading(false));
  }, []);

  const categories = useMemo(() => {
    const unique = [...new Set(plans.map((plan) => plan.category))];
    return ['all', ...unique];
  }, [plans]);

  const filteredPlans = useMemo(() => {
    let filtered = categoryFilter === 'all' ? plans : plans.filter((plan) => plan.category === categoryFilter);

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((plan) =>
        plan.title.toLowerCase().includes(query) ||
        plan.description.toLowerCase().includes(query) ||
        plan.category.toLowerCase().includes(query)
      );
    }

    const minValue = Number(minBudget.replace(/\D/g, '')) || 0;
    const maxValue = Number(maxBudget.replace(/\D/g, '')) || Infinity;

    if (minBudget.trim() || maxBudget.trim()) {
      filtered = filtered.filter((plan) => {
        const price = Number(plan.price);
        return price >= minValue && price <= maxValue;
      });
    }

    return [...filtered].sort((a, b) => (sortOrder === 'asc' ? a.price - b.price : b.price - a.price));
  }, [plans, categoryFilter, sortOrder, searchQuery, minBudget, maxBudget]);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [terrainSize, setTerrainSize] = useState('');
  const [customRooms, setCustomRooms] = useState(3);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [style, setStyle] = useState('moderne');
  const [budget, setBudget] = useState('');
  const [comment, setComment] = useState('');
  const [submittingCustom, setSubmittingCustom] = useState(false);
  const [whatsappLink, setWhatsappLink] = useState('');
  const [customMessage, setCustomMessage] = useState('');

  const sendCustomRequest = (event) => {
    event.preventDefault();
    setSubmittingCustom(true);
    setWhatsappLink('');
    setCustomMessage('');

    fetch(`${API_BASE}/custom-plan/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        phone,
        terrain_size: terrainSize,
        rooms: customRooms,
        style,
        budget,
        comment,
      }),
    })
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.detail || 'Erreur lors de l’envoi');
        }
        setWhatsappLink(`https://wa.me/?text=${encodeURIComponent(data.whatsapp_text)}`);
        setCustomMessage('Votre demande a été enregistrée. Vous pouvez maintenant ouvrir WhatsApp.');
      })
      .catch((error) => {
        setCustomMessage(error.message || 'Erreur lors de l’envoi de la demande.');
      })
      .finally(() => setSubmittingCustom(false));
  };

  const closeDetails = () => setSelectedPlan(null);

  return (
    <div className="app-shell">
      <header className="hero-section">
        <div>
          <span>HabitatSen</span>
          <h1>Catalogue de plans modernes adaptés au Sénégal</h1>
          <p>Explorez des plans réels et attractifs, étudiés pour le marché sénégalais, dessinés comme par un architecte local et proposés à tarifs accessibles en FCFA.</p>
        </div>
      </header>

      <section className="plans-section">
        <div className="section-header">
          <h2>Plans disponibles</h2>
          <p>Des maisons, des immeubles et des commerces avec des designs fonctionnels.</p>
        </div>

        <div className="filters-row">
          <label>
            Rechercher :
            <input
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Ex: maison, immeuble, budget..."
            />
          </label>

          <label>
            Catégorie :
            <select value={categoryFilter} onChange={(event) => setCategoryFilter(event.target.value)}>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category === 'all' ? 'Toutes les catégories' : category}
                </option>
              ))}
            </select>
          </label>

          <div className="budget-row">
            <label>
              Budget min
              <input
                type="text"
                value={minBudget}
                onChange={(event) => setMinBudget(event.target.value)}
                placeholder="ex: 3 000 000"
              />
            </label>
            <label>
              Budget max
              <input
                type="text"
                value={maxBudget}
                onChange={(event) => setMaxBudget(event.target.value)}
                placeholder="ex: 15 000 000"
              />
            </label>
          </div>

          <label>
            Trier par prix :
            <select value={sortOrder} onChange={(event) => setSortOrder(event.target.value)}>
              <option value="asc">Croissant</option>
              <option value="desc">Décroissant</option>
            </select>
          </label>
        </div>

        {loading ? (
          <p>Chargement des plans...</p>
        ) : (
          <div className="plan-grid">
            {filteredPlans.map((plan) => (
              <PlanCard key={plan.id} plan={plan} onOpenDetails={setSelectedPlan} />
            ))}
          </div>
        )}
      </section>

      {selectedPlan && (
        <div className="plan-detail-overlay" onClick={closeDetails}>
          <div className="plan-detail-card" onClick={(event) => event.stopPropagation()}>
            <button className="close-detail" onClick={closeDetails}>&times;</button>
            <img src={selectedPlan.image_url || 'https://via.placeholder.com/720x400'} alt={selectedPlan.title} />
            <div className="plan-detail-content">
              <h2>{selectedPlan.title}</h2>
              <p className="detail-category">{selectedPlan.category.charAt(0).toUpperCase() + selectedPlan.category.slice(1)} - {selectedPlan.surface} - {selectedPlan.rooms} chambres</p>
              <p>{selectedPlan.description}</p>
              <ul className="detail-features">
                <li><strong>Surface :</strong> {selectedPlan.surface}</li>
                <li><strong>Chambres :</strong> {selectedPlan.rooms}</li>
                <li><strong>Prix :</strong> {Number(selectedPlan.price).toLocaleString('fr-FR')} FCFA</li>
                <li><strong>Design :</strong> Conçu pour le marché sénégalais et le climat local</li>
              </ul>
              <p className="detail-note">Ce plan est complet : clique sur la carte pour voir tous les détails et partager facilement sur WhatsApp.</p>
            </div>
          </div>
        </div>
      )}

      <section className="custom-section">
        <div className="section-header">
          <h2>Personnaliser votre plan</h2>
          <p>Décrivez votre terrain, le nombre de chambres, le style et votre budget. Nous préparons votre demande et ouvrons WhatsApp.</p>
        </div>

        <form className="custom-form" onSubmit={sendCustomRequest}>
          <div className="form-grid">
            <label>
              Nom complet
              <input type="text" value={name} onChange={(event) => setName(event.target.value)} required />
            </label>
            <label>
              Téléphone
              <input type="text" value={phone} onChange={(event) => setPhone(event.target.value)} required />
            </label>
            <label>
              Taille du terrain
              <input type="text" value={terrainSize} onChange={(event) => setTerrainSize(event.target.value)} placeholder="ex: 10m x 20m" required />
            </label>
            <label>
              Nombre de chambres
              <input type="number" value={customRooms} onChange={(event) => setCustomRooms(Number(event.target.value))} min="1" required />
            </label>
            <label>
              Style souhaité
              <select value={style} onChange={(event) => setStyle(event.target.value)}>
                <option value="moderne">Moderne</option>
                <option value="traditionnel">Traditionnel</option>
                <option value="mixte">Mixte</option>
              </select>
            </label>
            <label>
              Budget estimé
              <input type="text" value={budget} onChange={(event) => setBudget(event.target.value)} placeholder="ex: 10 000 000 FCFA" required />
            </label>
          </div>

          <label>
            Commentaire / détails supplémentaires
            <textarea value={comment} onChange={(event) => setComment(event.target.value)} placeholder="Ajoutez des précisions ici..." />
          </label>

          <div className="form-actions">
            <button type="submit" disabled={submittingCustom}>
              {submittingCustom ? 'Envoi...' : 'Envoyer vers WhatsApp'}
            </button>
            {whatsappLink && (
              <a className="whatsapp-button" href={whatsappLink} target="_blank" rel="noreferrer">
                Ouvrir WhatsApp
              </a>
            )}
          </div>
          {customMessage && <p className="form-note">{customMessage}</p>}
        </form>
      </section>
    </div>
  );
}

export default App;
