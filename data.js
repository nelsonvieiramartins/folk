// --- BANCO DE DADOS (FRONT-END) ---

const DB_ITEMS = [
    // GRÁTIS (Depósito)
    { id: 1, name: 'Fita adesiva', type: 'FREE', buy_coins: 0, sell_coins: 1, icon: 'texture', color: 'gray-300' },
    { id: 2, name: 'Elásticos', type: 'FREE', buy_coins: 0, sell_coins: 1, icon: 'all_out', color: 'gray-300' },
    { id: 3, name: 'Madeirite', type: 'FREE', buy_coins: 0, sell_coins: 2, icon: 'table_restaurant', color: 'orange-300' },

    // 1 MOEDA (Depósito)
    { id: 4, name: 'Fios', type: 'ONE_COIN', buy_coins: 1, sell_coins: 2, icon: 'cable', color: 'blue-400' },
    { id: 5, name: 'Tubo de PVC', type: 'ONE_COIN', buy_coins: 1, sell_coins: 2, icon: 'water_damage', color: 'gray-100' },
    { id: 6, name: 'Barbante', type: 'ONE_COIN', buy_coins: 1, sell_coins: 1, icon: 'gesture', color: 'yellow-200' },

    // SUPORTE (Seu Zé)
    { id: 7, name: 'Base Ventilador', type: 'SUPPORT', buy_coins: 10, sell_coins: 5, icon: 'mode_fan', color: 'gray-400' },
    { id: 8, name: 'Tripé de câmera', type: 'SUPPORT', buy_coins: 15, sell_coins: 7, icon: 'photo_camera', color: 'gray-500' },
    { id: 9, name: 'Carrinho de Mão', type: 'SUPPORT', buy_coins: 20, sell_coins: 10, icon: 'shopping_cart', color: 'green-500' },
    { id: 10, name: 'Caixa de Papelão', type: 'SUPPORT', buy_coins: 5, sell_coins: 2, icon: 'inventory_2', color: 'orange-200' },
    { id: 11, name: 'Estacas Madeira', type: 'SUPPORT', buy_coins: 10, sell_coins: 5, icon: 'fence', color: 'orange-400' },
    { id: 12, name: 'Balde', type: 'SUPPORT', buy_coins: 8, sell_coins: 4, icon: 'delete', color: 'blue-300' },
    { id: 13, name: 'Chapa de Metal', type: 'SUPPORT', buy_coins: 15, sell_coins: 7, icon: 'grid_4x4', color: 'gray-400' },
    { id: 14, name: 'Tijolo', type: 'SUPPORT', buy_coins: 8, sell_coins: 4, icon: 'view_comfy', color: 'red-400' },
    { id: 15, name: 'Caixote Madeira', type: 'SUPPORT', buy_coins: 12, sell_coins: 6, icon: 'widgets', color: 'orange-300' },

    // ESSENCIAL (Seu Zé)
    { id: 16, name: 'Pistola Nerf', type: 'ESSENTIAL', buy_coins: 16, sell_coins: 8, icon: 'water_drop', color: 'orange-500' },
    { id: 17, name: 'Nerf Vulcan', type: 'ESSENTIAL', buy_coins: 20, sell_coins: 10, icon: 'construction', color: 'yellow-500' },
    { id: 18, name: 'Super Soaker', type: 'ESSENTIAL', buy_coins: 18, sell_coins: 9, icon: 'opacity', color: 'blue-500' },
    { id: 19, name: 'Soprador de Folhas', type: 'ESSENTIAL', buy_coins: 19, sell_coins: 9, icon: 'air', color: 'gray-300' },
    { id: 20, name: 'Ratoeira', type: 'ESSENTIAL', buy_coins: 15, sell_coins: 7, icon: 'pest_control', color: 'gray-600' },
    { id: 21, name: 'Pá de Jardim', type: 'ESSENTIAL', buy_coins: 20, sell_coins: 10, icon: 'hardware', color: 'gray-400' },
    { id: 22, name: 'Pote de Vidro', type: 'ESSENTIAL', buy_coins: 10, sell_coins: 5, icon: 'blender', color: 'blue-200' },
    { id: 23, name: 'Espanador de Pó', type: 'ESSENTIAL', buy_coins: 15, sell_coins: 7, icon: 'cleaning_services', color: 'yellow-100' },
    { id: 24, name: 'Mangueira Furada', type: 'ESSENTIAL', buy_coins: 15, sell_coins: 7, icon: 'waves', color: 'green-400' },
    { id: 25, name: 'Pulverizador', type: 'ESSENTIAL', buy_coins: 16, sell_coins: 8, icon: 'sanitizer', color: 'purple-400' },
    { id: 26, name: 'Roupas Velhas', type: 'ESSENTIAL', buy_coins: 10, sell_coins: 5, icon: 'checkroom', color: 'red-300' },
    { id: 27, name: 'Bambolê', type: 'ESSENTIAL', buy_coins: 15, sell_coins: 7, icon: 'data_usage', color: 'pink-400' },
    { id: 28, name: 'Tapete Velho', type: 'ESSENTIAL', buy_coins: 20, sell_coins: 10, icon: 'aspect_ratio', color: 'red-500' },
    { id: 29, name: 'Aspersor Oscilante', type: 'ESSENTIAL', buy_coins: 17, sell_coins: 8, icon: 'shower', color: 'blue-400' },
    { id: 30, name: 'Pneu de Carro', type: 'ESSENTIAL', buy_coins: 18, sell_coins: 9, icon: 'radio_button_unchecked', color: 'gray-600' },
    { id: 31, name: 'Motor Elétrico', type: 'ESSENTIAL', buy_coins: 20, sell_coins: 10, icon: 'ev_station', color: 'yellow-400' },
    { id: 32, name: 'Roda de Bicicleta', type: 'ESSENTIAL', buy_coins: 15, sell_coins: 7, icon: 'timelapse', color: 'gray-300' },
    { id: 33, name: 'Bateria de Carro', type: 'ESSENTIAL', buy_coins: 19, sell_coins: 9, icon: 'battery_charging_full', color: 'green-500' }
];

const DB_RECIPES = [
    { id: 101, name: 'Sentinela Nerf', req: [16, 7, 1, 4], damage: 2, range: 40, type: 'IMPACT', icon: 'mode_fan', color: 'orange' },
    { id: 102, name: 'Metralhadora Vulcan', req: [17, 7, 1, 4], damage: 4, range: 40, type: 'IMPACT', icon: 'construction', color: 'yellow' },
    { id: 103, name: 'Sentinela de Fogo', req: [18, 8, 1, 4], damage: 3, range: 45, type: 'FIRE', icon: 'local_fire_department', color: 'red' },
    { id: 104, name: 'Canhão de Tênis', req: [19, 9, 1, 5], damage: 5, range: 50, type: 'IMPACT', icon: 'sports_baseball', color: 'gray' },
    { id: 105, name: 'Mina de Goma', req: [20, 10], damage: 3, range: 10, type: 'IMPACT', icon: 'pest_control', color: 'gray' },
    { id: 106, name: 'Lançador de Geleca', req: [21, 11, 2, 6], damage: 2, range: 35, type: 'WATER', icon: 'hardware', color: 'green' },
    { id: 107, name: 'Armadilha de Gude', req: [22, 11, 6], damage: 2, range: 10, type: 'IMPACT', icon: 'scatter_plot', color: 'blue' },
    { id: 108, name: 'Morteiro de Água', req: [11, 2, 5], damage: 3, range: 35, type: 'WATER', icon: 'opacity', color: 'blue' },
    { id: 109, name: 'Armadilha Espanador', req: [23, 11, 3, 6], damage: 1, range: 15, type: 'IMPACT', icon: 'cleaning_services', color: 'yellow' },
    { id: 110, name: 'Teia de Aranha', req: [11, 6], damage: 0, range: 10, type: 'WATER', icon: 'blur_on', color: 'white' }, // Slow
    { id: 111, name: 'Cobra Mangueira', req: [24, 3, 4], damage: 2, range: 15, type: 'WATER', icon: 'waves', color: 'green' },
    { id: 112, name: 'Spray de Pimenta', req: [25, 6], damage: 3, range: 20, type: 'FIRE', icon: 'sanitizer', color: 'purple' },
    { id: 113, name: 'Espantalho', req: [26, 3, 6], damage: 0, range: 25, type: 'IMPACT', icon: 'emoji_people', color: 'orange' }, // Distract
    { id: 114, name: 'Bambolê de Fogo', req: [27, 3, 6], damage: 4, range: 15, type: 'FIRE', icon: 'data_usage', color: 'red' },
    { id: 115, name: 'Tapete de Brasas', req: [28, 13, 4], damage: 5, range: 10, type: 'FIRE', icon: 'aspect_ratio', color: 'red' },
    { id: 116, name: 'Aspersor de Lama', req: [29, 12, 5], damage: 3, range: 25, type: 'WATER', icon: 'shower', color: 'blue' },
    { id: 117, name: 'Pêndulo de Pneu', req: [30, 3, 6], damage: 6, range: 20, type: 'IMPACT', icon: 'vignette', color: 'gray' },
    { id: 118, name: 'Gravidade Fogo', req: [14, 6], damage: 4, range: 10, type: 'FIRE', icon: 'view_comfy', color: 'red' },
    { id: 119, name: 'Besta de Lápis', req: [31, 15, 4], damage: 4, range: 45, type: 'IMPACT', icon: 'ev_station', color: 'yellow' },
    { id: 120, name: 'Lançador Tênis', req: [32, 3, 5], damage: 4, range: 40, type: 'IMPACT', icon: 'timelapse', color: 'green' },
    { id: 121, name: 'Armadilha Choque', req: [33, 4], damage: 5, range: 15, type: 'FIRE', icon: 'battery_charging_full', color: 'yellow' }
];

const DB_ENEMIES = {
    'A': { id: 1, name: 'Saci', hp: 1, speed: 8, icon: 'do_not_step', color: 'red', desc: 'Ágil. Infiltrador.', weakness: 'WATER' },
    'B': { id: 2, name: 'Cuca Jr.', hp: 4, speed: 5, icon: 'sentiment_neutral', color: 'green', desc: 'Atropelador.', weakness: 'WATER' },
    'C': { id: 3, name: 'Boitatá', hp: 10, speed: 3, icon: 'visibility', color: 'purple', desc: 'Guardião.', weakness: 'WATER' },
    'BOSS': { id: 4, name: 'Mapinguari', hp: 60, speed: 2, icon: 'smart_toy', color: 'yellow', desc: 'O Guardião Final. Imparável.', weakness: 'FIRE' }
};

const STAGES = {
    1: ['A'],
    2: ['A', 'A'],
    3: ['A', 'A', 'A'],
    4: ['A', 'B'],
    5: ['A', 'A', 'B'],
    6: ['A', 'A', 'A', 'B'],
    7: ['A', 'A', 'B', 'B'],
    8: ['A', 'A', 'A', 'B', 'B'],
    9: ['A', 'A', 'A', 'B', 'B', 'B'],
    10: ['A', 'B', 'C'],
    11: ['A', 'A', 'B', 'C'],
    12: ['A', 'A', 'A', 'B', 'C'],
    13: ['A', 'A', 'B', 'B', 'C'],
    14: ['A', 'A', 'A', 'B', 'B', 'C'],
    15: ['A', 'A', 'A', 'B', 'B', 'B', 'C'],
    16: ['A', 'A', 'B', 'B', 'C', 'C'],
    17: ['A', 'A', 'A', 'B', 'B', 'C', 'C'],
    18: ['A', 'A', 'A', 'B', 'B', 'B', 'C', 'C'],
    19: ['A', 'A', 'A', 'B', 'B', 'B', 'C', 'C', 'C'],
    20: ['BOSS']
};

