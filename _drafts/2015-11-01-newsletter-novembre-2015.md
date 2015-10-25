---
layout: post
title:  "Newsletter de novembre"
categories: actualites
---

Bonjour à tous,

CakePHP continue son cycle de développement en améliorant la version 3, qui en
est maintenant à la version 3.1.3. Une amélioration me semble intéressant à
noter : il s'agit des variables d'environnement. Une [RFC](https://github.com/cakephp/app/issues/224) est en cours de
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
l'on souhaite sans avoir à faire une modification du code et donc sans avoir
à faire un commit avec la modification de notre configuration.

## Et Docker dans tout ça

Tout ceci va avoir un intérêt supplémentaire si vous utilisez un service comme Docker.

## Docker pour participer à la documentation de CakePHP

Les docs de CakePHP utilisent des librairies comme sphinx ou latex pour
construire la documentation dans différents formats : pdf, latex, html, ...

Pour cela, il faut avoir installé les bons logiciels, aux bonnes versions et
selon son OS, cela peut s'avérer très compliqué. Grâce à Docker, ce problème
est résolu. Il faut bien évidememnt avoir docker installé et ensuite, vous allez
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


|                                 |Janvier | Février |   Mars   |  Avril |  Mai  |  Juin  |  Juillet  |  Août  |
|---------------------------------|--------|---------|----------|--------|-------|--------|-----------|--------|
|Nb d'inscriptions sur le forum   |   11   |   10    |    20    | 11     |  15   |  23    |   19      |  10    |
|Nb de messages sans réponse      |   0    |   2     |    1     |  1     |   1   |   4    |    3      |   0    |

Bienvenue à ...

Pdf de statistiques de Google Analytics:

![Analytics d'Octobre 2015]({{ site.url }}/img/analytics-www.cakephp-fr.org-statistiques-mensuelles-20151001-20151031.png)

Dernières versions de CakePHP
-----------------------------

Au 1er novembre 2015:

- [CakePHP 2.7.5](https://github.com/cakephp/cakephp/releases/tag/2.7.5)
- [CakePHP 3.1.3](https://github.com/cakephp/cakephp/releases/tag/3.1.3)

Ressources, Plugins & Contributions
-----------------------------------

- Auto-promo avec des [Dockerfile](https://hub.docker.com/r/cake17/cakephp/) pour la documentation de CakePHP.

- Vous pouvez faire une pull request sur [ce dépôt](https://github.com/cakephp-fr/cakephp-fr.github.io/blob/master/_drafts/2015-12-01-newsletter-decembre-2015.md) pour ajouter les articles, plugins qui pourraient intéresser la communauté
pour le mois prochain.


Merci à tous pour l'aide que vous avez pu apporter !


A bientôt et n'hésitez pas à nous contacter sur le
[forum](http://forum.cakephp-fr.org), [github](https://github.com/cakephp-fr),
[IRC](http://www.cakephp-fr.org/irc), [twitter](https://twitter.com/cakephpfr) ...
