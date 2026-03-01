import sqlite3
import os

DB_FILE = 'projectfolk.db'

def create_database():
    """Cria e inicializa o banco SQLite com o Schema do Project Folk"""
    if os.path.exists(DB_FILE):
        print(f"O banco {DB_FILE} já existe. Recriando...")
        os.remove(DB_FILE)

    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()

    # Habilita suporte a chaves estrangeiras no SQLite
    cursor.execute('PRAGMA foreign_keys = ON')

    # 1. Tabela: Game Session
    cursor.execute('''
        CREATE TABLE GameSession (
            id TEXT PRIMARY KEY,
            player_name TEXT NOT NULL,
            current_night INTEGER DEFAULT 1,
            current_phase TEXT CHECK(current_phase IN ('MORNING', 'AFTERNOON', 'NIGHT')) DEFAULT 'MORNING',
            relics_hp INTEGER DEFAULT 3,
            currency_tamps INTEGER DEFAULT 0,
            currency_coins INTEGER DEFAULT 0,
            morning_action_used BOOLEAN DEFAULT 0,
            afternoon_actions_left INTEGER DEFAULT 2,
            special_action_used BOOLEAN DEFAULT 0
        )
    ''')

    # 2. Tabela Dicionário: Itens do Jogo
    cursor.execute('''
        CREATE TABLE Items (
            id INTEGER PRIMARY KEY,
            name TEXT NOT NULL,
            type TEXT CHECK(type IN ('FREE', 'ONE_COIN', 'SUPPORT', 'ESSENTIAL', 'WEAPON', 'TRAP')) NOT NULL,
            buy_price_tamps INTEGER DEFAULT 0,
            buy_price_coins INTEGER DEFAULT 0,
            sell_price_tamps INTEGER DEFAULT 0
        )
    ''')

    # 3. Tabela Dicionário: Criaturas
    cursor.execute('''
        CREATE TABLE Creatures (
            id INTEGER PRIMARY KEY,
            name TEXT NOT NULL,
            category TEXT CHECK(category IN ('A', 'B', 'C')) NOT NULL,
            base_hp INTEGER NOT NULL,
            weakness TEXT CHECK(weakness IN ('FIRE', 'WATER', 'IMPACT')),
            passive_skill TEXT
        )
    ''')

    # 4. Tabela Dicionário: Recipes (Crafting)
    cursor.execute('''
        CREATE TABLE Recipes (
            id INTEGER PRIMARY KEY,
            weapon_name TEXT NOT NULL,
            damage_type TEXT CHECK(damage_type IN ('FIRE', 'WATER', 'IMPACT')) NOT NULL,
            base_damage INTEGER NOT NULL,
            attack_range INTEGER NOT NULL,
            req_essential_id INTEGER,
            req_support_id INTEGER,
            req_free_id INTEGER,
            req_coin_id INTEGER,
            FOREIGN KEY(req_essential_id) REFERENCES Items(id),
            FOREIGN KEY(req_support_id) REFERENCES Items(id),
            FOREIGN KEY(req_free_id) REFERENCES Items(id),
            FOREIGN KEY(req_coin_id) REFERENCES Items(id)
        )
    ''')

    # 5. Tabela Dinâmica: Inventário do Jogador
    cursor.execute('''
        CREATE TABLE PlayerInventory (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            session_id TEXT NOT NULL,
            item_id INTEGER NOT NULL,
            quantity INTEGER DEFAULT 1,
            FOREIGN KEY(session_id) REFERENCES GameSession(id) ON DELETE CASCADE,
            FOREIGN KEY(item_id) REFERENCES Items(id)
        )
    ''')

    # 6. Tabela Dinâmica: Tabuleiro/Defesas Plantadas
    cursor.execute('''
        CREATE TABLE BoardState (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            session_id TEXT NOT NULL,
            tile_index INTEGER NOT NULL,
            weapon_item_id INTEGER NOT NULL,
            upgrade_applied TEXT,
            FOREIGN KEY(session_id) REFERENCES GameSession(id) ON DELETE CASCADE,
            FOREIGN KEY(weapon_item_id) REFERENCES Items(id)
        )
    ''')
    
    # ---------------------------------------------------------
    # INSERÇÃO DE DADOS INICIAIS (SEEDING)
    # ---------------------------------------------------------

    # Populando Itens Básicos
    items_data = [
        (1, 'Pistola Nerf', 'ESSENTIAL', 20, 0, 10),
        (2, 'Base Ventilador', 'SUPPORT', 10, 0, 5),
        (3, 'Fita adesiva', 'FREE', 0, 0, 1),
        (4, 'Fios', 'ONE_COIN', 0, 1, 2),
        (5, 'Barbante', 'ONE_COIN', 0, 1, 2),
        (6, 'Ratoeira', 'ESSENTIAL', 15, 0, 7),
        (7, 'Caixa de Papelão', 'SUPPORT', 5, 0, 2),
        (8, 'Torreta Elétrica', 'WEAPON', 0, 0, 25),
        (9, 'Mina de Goma', 'TRAP', 0, 0, 15),
    ]
    cursor.executemany('INSERT INTO Items VALUES (?,?,?,?,?,?)', items_data)

    # Populando Criaturas (Amostra Baseada no Manual)
    creatures_data = [
        (1, 'O Saci', 'A', 1, 'WATER', 'Pode saltar armadilhas'),
        (2, 'Mula sem Cabeça', 'B', 4, 'WATER', 'Ignora a primeira armadilha de impacto'),
        (3, 'A Cuca', 'B', 4, 'WATER', 'Pode desativar temporariamente uma torreta'),
        (4, 'Lobisomem', 'B', 4, 'FIRE', 'Ganha bônus de movimento se ferido'),
        (5, 'Boitatá', 'C', 10, 'WATER', 'Imune a ataques a distância')
    ]
    cursor.executemany('INSERT INTO Creatures VALUES (?,?,?,?,?,?)', creatures_data)

    # Populando as Duas Primeiras Receitas de Exemplo (Tabela do Manual)
    # 1. Sentinela Nerf
    # 5. Mina de Goma 
    recipes_data = [
        (1, 'Sentinela Nerf', 'IMPACT', 4, 2, 1, 2, 3, 4), 
        (2, 'Mina de Goma', 'IMPACT', 2, 1, 6, 7, None, None) 
    ]
    cursor.executemany('INSERT INTO Recipes VALUES (?,?,?,?,?,?,?,?,?)', recipes_data)

    # Criando um Save Game de Teste (Sessão de Exemplo)
    cursor.execute("INSERT INTO GameSession (id, player_name, currency_tamps, currency_coins) VALUES ('test_session_1', 'Projeto Zé', 145, 5)")
    
    # Dando alguns itens para a sessão de teste
    inventory_data = [
        ('test_session_1', 1, 1), # 1x Pistola Nerf
        ('test_session_1', 4, 3), # 3x Fios
        ('test_session_1', 5, 5)  # 5x Barbante
    ]
    cursor.executemany('INSERT INTO PlayerInventory (session_id, item_id, quantity) VALUES (?,?,?)', inventory_data)

    conn.commit()
    conn.close()
    print("Banco de dados SQLite 'projectfolk.db' criado e populado com sucesso!")

if __name__ == '__main__':
    create_database()
