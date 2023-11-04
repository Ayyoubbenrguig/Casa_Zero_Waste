import sqlite3

class poubelle:
    def __init__(self, id, latitude, longitude, niveau, notification):
        id_poubelle.self = id_poubelle
        latitude.self = latitude
        longitude.self = longitude
        niveau.self = niveau
        notification.self = notification


    def ajouter(self):
        conn = sqlite3.connect('example.db')
        cur = conn.cursor()

        # Vérifiez si la poubelle existe déjà dans la table
        cur.execute('SELECT id FROM Data_poubelle WHERE self.id = ?', (self.id_poubelle,))
        result = cur.fetchone()
        if result is None:
            # La poubelle n'existe pas encore, utilisez INSERT pour l'ajouter
            cur.execute('''INSERT INTO Data_poubelle (id, latitude, longitude, niveau, notification)
                       VALUES (?, ?, ?, ?, ?)''', (self.id_poubelle, self.latitude, self.longitude, self.niveau, self.notification))
        else:
            # La poubelle existe déjà, utilisez UPDATE pour la mettre à jour
            cur.execute('''UPDATE Data_poubelle SET latitude = ?, longitude = ?, niveau = ?, notification = ?
                           WHERE id = ?''', (self.latitude, self.longitude, self.niveau, self.notification, self.id_poubelle))

       #Enregistrez les modifications apportées à la base de données
        conn.commit()

       # Fermez la connexion à la base de données
       conn.close()

    def recuperer_info_poubelle(self):
        conn = sqlite3.connect('example.db')
        cur = conn.cursor()

        # Exécutez la requête SELECT pour récupérer les informations de la poubelle avec l'ID donné  
        cur.execute('SELECT * FROM Data_poubelle WHERE id = ?', (self.id_poubelle,))
        result = cur.fetchone()

        # Fermez la connexion à la base de données
        conn.close()

        # Retournez les informations de la poubelle sous forme de tuple
        return result