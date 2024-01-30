import random
import numpy as np
import time

class player():
    def __init__(self, tropas):
        self.tropas = tropas
        self.dados = np.array([])
        self.wins = 0


    def roll(self):
        return random.randint(1,6)
    
    def comparar_dados(self, oponente):
        n = len(self.dados)
        self.dados = np.sort(self.dados)
        oponente.dados = np.sort(oponente.dados)
        #ganhou = np.sum(self.dados > oponente.dados)
        #perdeu = n - ganhou
        #return ganhou, perdeu
        perdeu, ganhou = 0, 0
        for i in range(len(self.dados)):
            if self.dados[i] > oponente.dados[i]:
                ganhou += 1
            else:
                perdeu += 1
        return ganhou, perdeu

    def attack(self, oponente):
        n_dados = np.min([3, self.tropas, oponente.tropas])
        
        self.dados = np.random.randint(1,7,n_dados)
        oponente.dados = np.random.randint(1,7,n_dados)

        g, p = self.comparar_dados(oponente)

        self.tropas -= p
        oponente.tropas -= g
        self.dados = np.array([])
        oponente.dados = np.array([])

        if self.tropas == 0 and oponente.tropas == 3:
            self.wins += 1
            return True 
        elif oponente.tropas == 0:
            #self.wins = self.wins + 1
            return True
        elif self.tropas == 0:
            return True
        return False

def simulacao():
    s = time.time()
    n = 1000000
    aux = False
    p1 = player(0)
    p2 = player(0)
    
    for i in range(n):
        if i == n/10:
            print(f'10%... in {round(time.time() - s)} seconds')
        elif i == n/4:
            print(f'25%... in {round(time.time() - s)} seconds')
        elif i == n/2:
            print(f'50%... in {round(time.time() - s)} seconds')
        aux = False
        p1.tropas = 10
        p2.tropas = 3
        while not aux:
            aux = p1.attack(p2)
            
            
    print(f'{round(p1.wins/n, 2)}% de win rate')

start = time.time()
simulacao()
print(f'levou {round(time.time() - start)} segundos')