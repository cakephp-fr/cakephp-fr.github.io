---
layout: post
title:  "Newsletter de novembre"
categories: actualites
---

Bonjour à tous,

CakePHP continue son cycle de développement en améliorant la version 3, qui en
est maintenant à la version 3.1.3. Il me semble intéressant de noter une
amélioration qui se prépare : il s'agit des variables d'environnement. Une [RFC](https://github.com/cakephp/app/issues/224) est en cours de
discussion à propos des variables d'environnement et de leur intégration dans
le squelette d'application [app](https://github.com/cakephp/app) quand on créé
un nouveau projet CakePHP.

## Les variables d'environnement

De plus en plus, l'idée d'utiliser des variables d'environnement pour configurer
des applications grandit. Les variables d'environnement sont ainsi extraites du
code d'une application. Cela va donc nous éviter le risque de commiter les clés
de connexion à des services (pour les services google, services d'amazon, .... )
puisque ces clés, mots de passe, .... ne seront plus écrits en dur dans notre
code.

On voit aussi l'avantage que cela a sur la configuration d'une application mise
en ligne, puisqu'il nous suffira de modifier les variables d'environnement que
l'on souhaite, sans avoir à faire une modification du code et donc sans avoir
à faire un commit avec la modification de notre configuration.

## Et Docker dans tout ça

Tout ceci va avoir un intérêt supplémentaire si vous utilisez un service comme Docker. Si vous souhaitez tester comment pourrait se dérouler le développement
d'une application CakePHP 3 avec docker, vous pouvez faire ce qui suit:

    git clone git@github.com:cakephp-fr/app.git
    cd app
    # on va sur la branche avec la version de CakePHP 'dockerizé'
    git checkout docker
    composer install --prefer-dist

Vous allez ainsi avoir un squelette d'application correspondant au squelette
officiel. Effectivement si vous installez un projet CakePHP avec [la méthode
officielle](http://book.cakephp.org/3.0/fr/installation.html#installer-cakephp),
avec `composer create-project --prefer-dist cakephp/app [app_name]`, vous
obtiendrez le même squelette à 3 exceptions près:

* Le fichier `config/bootstrap.php` contient les variables d'environnement `CAKEPHP_TIMEZONE_DEFAULT` et `CAKEPHP_LOCALE_DEFAULT`.
* Le fichier `config/app.default.php` contient de nombreuses variables d'environnement. De plus, les configurations aux services utilisent une url.
Cela permet de donner une configuration en une seule ligne, plutôt qu'avec un
tableau de configuration.

Je prends un exemple avec la configuration pour la base de données. On va utiliser ceci:

    'Datasources' => [
        'default' => [
            'url' => env('CAKEPHP_DATABASE_DEFAULT_URL', 'mysql://my_app:secret@localhost/my_app')
        ]
    ]

plutôt que l'ancienne version avec une configuration avec chaque paramètre défini:

    'Datasources' => [
        'default' => [
            'className' => 'Cake\Database\Connection',
            'driver' => 'Cake\Database\Driver\Mysql',
            'persistent' => false,
            'host' => 'localhost',
            'port' => 'nonstandard_port_number',
            'username' => 'my_app',
            'password' => 'secret',
            'database' => 'my_app',
            'encoding' => 'utf8',
            'timezone' => 'UTC',
            'cacheMetadata' => true,
            'log' => false,
            'quoteIdentifiers' => false,
            'init' => ['SET GLOBAL innodb_stats_on_metadata = 0'],
        ],
    ]

Vous vous demanderez pourquoi utiliser une url alors que la configuration
'classique' parait plus lisible. Et bien, grâce à la nouvelle façon de configurer, on peut facilement changer de type base de données. Par exemple,
une connexion pour une base de données postgres pourrait se faire de la façon suivante :

    'url' => env('CAKEPHP_DATABASE_DEFAULT_URL', 'postgres://my_app:secret@localhost/my_app')

Il suffit donc de changer une seule variable d'environnement pour changer votre
configuration vers un autre type de base de données.

On ferait de la même façon pour les autres services, de cache, de log, pour le
transport d'email, ... il suffira de changer une url qui contient tous les
paramètres pour avoir un nouveau service bien configuré. On se rapproche ainsi
d'une application 12factor, où les variables de l'application sont sorties du
code et où elles peuvent être changées pendant qu'une application tourne.

Si vous ne désirez pas utiliser Docker, comme expliqué dans le point suivant,
vous pouvez lancer votre application comme avant, en définissant les valeurs
de configuration directement dans les fichiers `app.php` et `bootstrap.php`.
Si les variables d'environnement ne sont pas définies, les valeurs utilisées
seront celles écrites dans ces fichiers.

* enfin, la dernière modification faite est l'ajout d'un fichier docker-compose.yml à la racine qui contient les configurations des containers (un avec mysql, un avec nginx, etc...) liés entre eux. Vous pouvez ainsi lancer en une commande l'ensemble des librairies nécessaires pour faire marcher votre application CakePHP 3:

        docker-compose up -d

Bien sûr, vous devez avoir `docker` [installé sur votre ordinateur](https://docs.docker.com/mac/step_one/) et si vous êtes sur mac
ou windows, être dans un `terminal Docker`.

Vous pouvez maintenant voir votre application dans votre navigateur en faisant:

    # vous aurez une adresse du type '192.168.99.100'
    docker-machine ip default
    # vous récupérer le port pour nginx, du type '32779'
    docker-compose ps

Entrez dans votre navigateur : `192.168.99.100:32779` pour notre exemple (à modifier selon ce que vous récupérez).

 Et Voilà, plus besoin d'installer un serveur nginx local, un serveur de base de
 données, un serveur de cache, etc... Tout sera téléchargé et executé dans des
 containers ce qui vous permet de préserver votre OS sans avoir à installer des librairies, ni avoir à les configurer.

## Docker pour participer à la documentation de CakePHP

On va pouvoir utiliser aussi Docker pour construire la documentation de
CakePHP. Les docs de CakePHP utilisent des librairies comme sphinx ou latex pour
construire la documentation dans différents formats : pdf, latex, html, ...

Pour cela, il faut avoir installé les bons logiciels, aux bonnes versions et
selon son OS, cela peut s'avérer très compliqué. Grâce à Docker, ce problème
est résolu. Il faut bien évidemment avoir docker installé et ensuite, vous allez
dans votre dossier local des docs, et vous lancez cette commande:

    # Pour construire la version html
    cd /path/to/your/local/docs
    docker run -it --rm -v $(pwd):/data cake17/cakephp:docs make html

    # Pour construire la version epub
    cd /path/to/your/local/docs
    docker run -it --rm -v $(pwd):/data cake17/cakephp:docs make epub

    # Pour construire la version latex
    cd /path/to/your/local/docs
    docker run -it --rm -v $(pwd):/data cake17/cakephp:docs make latex

    # Pour construire la version pdf
    cd /path/to/your/local/docs
    docker run -it --rm -v $(pwd):/data cake17/cakephp:docs make pdf


Meetups prévues
---------------

Si vous souhaitez organiser un meetup dans votre ville, vous pouvez en créer un
sur le [forum](forum.cakephp-fr.org/viewtopic.php?id=7291) ou sur
[twitter](https://twitter.com/cakephpfr).

Statistiques du site
--------------------

### Un petit récap de l'activité du site pour le mois d'octobre:


|                                 |Janvier | Février |   Mars   |  Avril |  Mai  |  Juin  |  Juillet  |  Août  |  Septembre  | Octobre  |
|---------------------------------|--------|---------|----------|--------|-------|--------|-----------|--------|-------------|----------|
|Nb d'inscriptions sur le forum   |   11   |   10    |    20    | 11     |  15   |  23    |   19      |  10    |       12    |  14      |
|Nb de messages sans réponse      |   0    |   2     |    1     |  1     |   1   |   4    |    3      |   0    |       12    |  4       |

Bienvenue à tous les nouveaux !!

Pdf de statistiques de Google Analytics:

![Analytics d'Octobre 2015]({{ site.url }}/img/analytics-www.cakephp-fr.org-statistiques-mensuelles-20151001-20151031.png)

Dernières versions de CakePHP
-----------------------------

Au 1er novembre 2015:

- [CakePHP 2.7.5](https://github.com/cakephp/cakephp/releases/tag/2.7.5)
- [CakePHP 3.1.3](https://github.com/cakephp/cakephp/releases/tag/3.1.3)

Ressources, Plugins & Contributions
-----------------------------------

- De nouveaux plugins ont été créés sur github. Ils sont en développement donc si vous souhaitez apporter votre aide, n'hésitez pas !
    - [Plugin cookies-eu](https://github.com/cakephp-fr/cookie-warning)
    - [Plugin oauth](https://github.com/cakephp-fr/oauth)
    - [Plugin recaptcha](https://github.com/cakephp-fr/recaptcha)

- Auto-promo avec des [Dockerfile](https://hub.docker.com/r/cake17/cakephp/) pour la documentation de CakePHP.

- Vous pouvez faire une pull request sur [ce dépôt](https://github.com/cakephp-fr/cakephp-fr.github.io/blob/master/_drafts/2015-12-01-newsletter-decembre-2015.md) pour ajouter les articles, plugins qui pourraient intéresser la communauté
pour le mois prochain.


Merci à tous pour l'aide que vous avez pu apporter !


A bientôt et n'hésitez pas à nous contacter sur le
[forum](http://forum.cakephp-fr.org), [github](https://github.com/cakephp-fr),
[IRC](http://www.cakephp-fr.org/irc), [twitter](https://twitter.com/cakephpfr) ...
