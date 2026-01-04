// Historical territory data for New France region
// Territories follow natural boundaries (rivers, lakes, mountains)

export const getTerritoriesByYear = (year) => {
  const territories = [];

  // St. Lawrence River and Great Lakes region - key geographical features
  const stLawrenceValley = {
    type: 'Feature',
    properties: { name: 'Vallée du Saint-Laurent', power: 'France', color: '#3B82F6' },
    geometry: {
      type: 'Polygon',
      coordinates: [[
        // Follows St. Lawrence River and Ottawa River
        // Format: [longitude, latitude] - must close the polygon
        [-79.5, 45.0], // West of Montreal
        [-75.0, 45.0], // Along St. Lawrence
        [-70.0, 46.5], // Quebec City area
        [-68.0, 47.5], // Gaspé Peninsula
        [-66.0, 48.0], // Eastern edge
        [-66.0, 46.0], // South along coast
        [-70.0, 45.0], // Back to Montreal area
        [-75.0, 44.5], // South along Ottawa River
        [-79.5, 44.5], // Back to start
        [-79.5, 45.0]  // Close polygon
      ]]
    }
  };

  // Great Lakes region (French control)
  const greatLakes = {
    type: 'Feature',
    properties: { name: 'Pays d\'en Haut', power: 'France', color: '#3B82F6' },
    geometry: {
      type: 'Polygon',
      coordinates: [[
        // Follows Great Lakes shoreline
        [-83.0, 42.0], // Lake Huron area
        [-82.0, 43.0], // Lake Erie
        [-79.0, 43.5], // Lake Ontario
        [-76.0, 44.0], // Along St. Lawrence
        [-75.0, 45.0], // Montreal area
        [-77.0, 46.0], // Ottawa River
        [-80.0, 46.5], // Lake Nipissing area
        [-83.0, 45.0], // Lake Superior area
        [-83.0, 42.0]
      ]]
    }
  };

  // British colonies (New England and New York)
  const britishColonies = {
    type: 'Feature',
    properties: { name: 'Colonies Britanniques', power: 'Britain', color: '#EF4444' },
    geometry: {
      type: 'Polygon',
      coordinates: [[
        // Follows natural boundaries - Hudson River, Appalachian Mountains
        [-75.0, 40.0], // New York area
        [-70.0, 41.0], // New England coast
        [-67.0, 44.0], // Maine
        [-68.0, 45.0], // Northern boundary
        [-72.0, 45.0], // Along St. Lawrence (disputed border)
        [-75.0, 44.0], // Lake Champlain area
        [-75.0, 42.0], // Hudson Valley
        [-75.0, 40.0]
      ]]
    }
  };

  // Iroquois Confederacy - follows traditional territories
  const iroquois = {
    type: 'Feature',
    properties: { name: 'Confédération Iroquoise', power: 'Iroquois', color: '#10B981' },
    geometry: {
      type: 'Polygon',
      coordinates: [[
        // Traditional Iroquois lands - Finger Lakes region
        [-77.5, 42.0], // Western edge
        [-75.5, 42.0], // Along Mohawk River
        [-74.0, 43.0], // Lake Champlain area
        [-75.0, 44.0], // St. Lawrence River
        [-77.0, 44.5], // Lake Ontario
        [-78.5, 43.5], // Finger Lakes
        [-77.5, 42.0]
      ]]
    }
  };

  // Huron-Wendat territory - around Georgian Bay
  const huron = {
    type: 'Feature',
    properties: { name: 'Huron-Wendat', power: 'Huron', color: '#F59E0B' },
    geometry: {
      type: 'Polygon',
      coordinates: [[
        // Georgian Bay and surrounding area
        [-81.0, 44.0], // Georgian Bay
        [-79.5, 44.0], // Lake Simcoe area
        [-78.0, 44.5], // Kawartha Lakes
        [-78.5, 45.5], // Ottawa River
        [-80.0, 46.0], // French River
        [-81.5, 45.0], // Back to Georgian Bay
        [-81.0, 44.0]
      ]]
    }
  };

  // Algonquin territory - Ottawa River valley
  const algonquin = {
    type: 'Feature',
    properties: { name: 'Algonquin', power: 'Algonquin', color: '#8B5CF6' },
    geometry: {
      type: 'Polygon',
      coordinates: [[
        // Ottawa River and surrounding forests
        [-78.0, 45.0], // Ottawa area
        [-76.0, 45.5], // Along Ottawa River
        [-75.0, 46.0], // Gatineau area
        [-76.0, 47.0], // Laurentian Mountains
        [-78.0, 47.0], // Algonquin Park area
        [-79.0, 46.0], // Back to Ottawa
        [-78.0, 45.0]
      ]]
    }
  };

  // Before 1608 - no permanent French settlements
  if (year < 1608) {
    territories.push(
      britishColonies,
      iroquois,
      huron,
      algonquin
    );
  }
  // 1608-1663 - Early French colonization
  else if (year < 1663) {
    territories.push(
      {
        ...stLawrenceValley,
        properties: { ...stLawrenceValley.properties, name: 'Nouvelle-France (Établissements)' }
      },
      britishColonies,
      iroquois,
      huron,
      algonquin
    );
  }
  // 1663-1713 - Expansion period
  else if (year < 1713) {
    territories.push(
      {
        ...stLawrenceValley,
        properties: { ...stLawrenceValley.properties, name: 'Nouvelle-France' }
      },
      greatLakes,
      britishColonies,
      iroquois,
      {
        ...huron,
        properties: { ...huron.properties, name: 'Huron-Wendat (Réduit)' }
      },
      algonquin
    );
  }
  // 1713-1759 - Treaty of Utrecht, some changes
  else if (year < 1759) {
    territories.push(
      {
        ...stLawrenceValley,
        properties: { ...stLawrenceValley.properties, name: 'Nouvelle-France' }
      },
      greatLakes,
      {
        ...britishColonies,
        geometry: {
          type: 'Polygon',
          coordinates: [[
            // Expanded British control after Treaty of Utrecht
            [-75.0, 40.0],
            [-70.0, 41.0],
            [-67.0, 44.0],
            [-68.0, 45.5], // Slightly expanded north
            [-72.0, 45.5],
            [-75.0, 44.5], // More control in Lake Champlain area
            [-75.0, 42.0],
            [-75.0, 40.0]
          ]]
        }
      },
      iroquois,
      {
        ...huron,
        properties: { ...huron.properties, name: 'Huron-Wendat (Dispersé)' }
      },
      algonquin
    );
  }
  // 1759-1760 - After Battle of the Plains of Abraham
  else {
    territories.push(
      {
        ...stLawrenceValley,
        properties: { ...stLawrenceValley.properties, name: 'Nouvelle-France (Occupée)' },
        geometry: {
          type: 'Polygon',
          coordinates: [[
            // Reduced French control - mainly Quebec City area
            [-71.5, 46.5], // Quebec City
            [-70.0, 46.8],
            [-68.0, 47.5], // Gaspé still French
            [-66.0, 48.0],
            [-66.0, 46.5],
            [-70.0, 46.0],
            [-72.0, 46.0],
            [-71.5, 46.5]
          ]]
        }
      },
      {
        ...greatLakes,
        properties: { ...greatLakes.properties, name: 'Pays d\'en Haut (Contesté)' }
      },
      {
        ...britishColonies,
        properties: { ...britishColonies.properties, name: 'Amérique du Nord Britannique' },
        geometry: {
          type: 'Polygon',
          coordinates: [[
            // Expanded British control
            [-75.0, 40.0],
            [-70.0, 41.0],
            [-67.0, 44.0],
            [-68.0, 46.0], // Further north
            [-72.0, 46.0], // Along St. Lawrence
            [-75.0, 45.0], // Montreal area (British)
            [-75.0, 42.0],
            [-75.0, 40.0]
          ]]
        }
      },
      iroquois,
      {
        ...huron,
        properties: { ...huron.properties, name: 'Huron-Wendat (Dispersé)' }
      },
      algonquin
    );
  }

  return territories;
};

// Get smooth transition data between years
export const getTerritoryTransition = (fromYear, toYear, progress) => {
  const fromTerritories = getTerritoriesByYear(fromYear);
  const toTerritories = getTerritoriesByYear(toYear);
  
  // For smooth transitions, we'll interpolate between territory states
  // This is a simplified version - in production, you'd want more sophisticated interpolation
  if (progress >= 1) {
    return toTerritories;
  }
  
  // Return territories based on progress
  return progress < 0.5 ? fromTerritories : toTerritories;
};

