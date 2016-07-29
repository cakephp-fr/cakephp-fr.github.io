---
layout: post
title:  "Newsletter d'octobre"
categories: actualites
---

Bonjour à tous,

Dans cette newsletter, vous pourrez découvrir les modifications faites dans la
nouvelle version 3.1, en attendant la nouvelle version 3.2 à venir.

## Changements pour la version 3.1

La version 3.1 de CakePHP est sortie le 19 septembre 2015. Vous pouvez donc mettre à jour vos projets de 3.0 vers 3.1 sans risque puisqu'il n'y a aucun changement rétro-incompatible. Vous pouvez regarder le [changelogs ici ](http://bakery.cakephp.org/2015/09/19/cakephp_3_1_0_released.html) Seuls des ajouts ont été faits et les plus notables concernent:

### l'ORM

Les associations peuvent être ajoutées à la volée après avoir créé vos find(). Ex:

    $articles = $this->Articles->find('popular')->all();

    // Un peu plus loin dans votre code, vous pouvez charger des associations en plus.
    $avecAuteurs = $this->Articles->loadInto($articles, ['Authors']);

Ajout des méthodes `notMatching()`, `leftJoinWith` et `innerJoinWith()`. Elles
servent à faire des jointures avec d'autres colonnes puis de filtrer selon ces
colonnes mais SANS ajouter les colonnes aux résultats.

### Mailer

Vous pouvez maintenant créer des classes qui étendent `Mailer`, dans lesquelles
vous pouvez ranger des envois de mail par type. Par exemple, tous les mails
concernant un Utilisateur (réinitialisation de mot de passe, confirmation de mot de passe, ...) vont pouvoir être rangés dans une classe `UserMailer`:

    namespace App\Mailer;

    use Cake\Mailer\Mailer;

    class UserMailer extends Mailer
    {
        public function welcome($user)
        {
            $this
                ->to($user->email)
                ->subject(sprintf('Welcome %s', $user->name))
                ->template('welcome_mail') // Par défaut le template avec le même nom que le nom de la méthode est utilisé.
                ->layout('custom');
        }

        public function resetPassword($user)
        {
            $this
                ->to($user->email)
                ->subject('Reset password')
                ->set(['token' => $user->token]);
        }
    }

  Il suffira ensuite d'ajouter le mailer pour l'envoi du mail:

      namespace App\Controller;

      use Cake\Mailer\MailerAwareTrait;

      class UsersController extends AppController
      {
          use MailerAwareTrait;

          public function register()
          {
              $user = $this->Users->newEntity();
              if ($this->request->is('post')) {
                  $user = $this->Users->patchEntitiy($user, $this->request->data())
                  if ($this->Users->save($user)) {
                      $this->getMailer('User')->send('welcome', [$user]);
                  }
              }
              $this->set('user', $user);
          }
      }

### Les styles par défaut du css ont été améliorés.

## Changements pour la version 3.1

Maintenant que la version 3.1 est sortie, la version 3.2 est déjà en
préparation. La [roadmap](https://github.com/cakephp/cakephp/wiki/3.2-Roadmap)
permet d'avoir un avant-goût des changements souhaités pour cette version.

### Version minimum de PHP 5.5

Première info, PHP 5.5 sera la version minimum (et plus 5.4.16 comme pour la version 3.1). En effet la version 5.4 de PHP n'accepte plus de support de sécurité depuis le [14 septembre 2015](http://php.net/supported-versions.php).

### Interface pour les messages Http

Le [group Fig](http://www.php-fig.org/) qui regroupe tous les acteurs de PHP le souhaitant (et les plus importants en font parti) a mis en place une interface
commune pour les messages Http afin que tous les projets PHP puissent être
compatibles plus facilement. Je vous invite à lire ce [document](http://www.php-fig.org/psr/psr-7/) si vous voulez en savoir plus.
CakePHP va donc se conformer à cette interface, tout en conservant l'ancienne
API afin de ne pas être rétro-incompatible.

### Nouvelle librairie pour les Date/Time

CakePHP utilisait la librairie [carbon](https://github.com/briannesbitt/Carbon)
pour gérer les Date/Time. Souhaitant avoir plus la main sur ce domaine,
l'équipe de CakePHP a choisi de créer une nouvelle librairie [chronos](https://github.com/cakephp/chronos) qui reprend le projet de carbon.
La libraire est encore en chantier, mais vous pouvez comme d'habitude pour les
projets CakePHP, proposer une modification, un ajout en faisant une PR ou en
ouvrant une issue.

Meetups prévues
---------------

Aucun meetup prévu ce mois-ci.

Pour information, le groupe [CakePHP France sur meetup.com](http://www.meetup.com/fr/CakePHP-France) a été arrêté mais si vous souhaitez organiser un meetup dans votre
ville, vous pouvez en créer un sur le
[forum](http://forum.cakephp-fr.org/viewtopic.php?id=7291) ou sur
[twitter](https://twitter.com/cakephpfr)

Statistiques du site
--------------------

### Un petit récap de l'activité du site pour le mois de septembre:


|                                 |Janvier | Février |   Mars   |  Avril |  Mai  |  Juin  |  Juillet  |  Août  |  Septembre  |
|---------------------------------|--------|---------|----------|--------|-------|--------|-----------|--------|-------------|
|Nb d'inscriptions sur le forum   |   11   |   10    |    20    | 11     |  15   |  23    |   19      |  10    |       12    |
|Nb de messages sans réponse      |   0    |   2     |    1     |  1     |   1   |   4    |    3      |   0    |       12    |

Bienvenue à tous les nouveaux !!

Pdf de statistiques de Google Analytics:

![Analytics de Septembre 2015]({{ site.url }}/img/analytics/analytics-www.cakephp-fr.org-statistiques-mensuelles-20150901-20150930.png)

Dernières versions de CakePHP
-----------------------------

Au 4 octobre 2015:

- [CakePHP 2.7.5](https://github.com/cakephp/cakephp/releases/tag/2.7.5)
- [CakePHP 3.1.0](https://github.com/cakephp/cakephp/releases/tag/3.1.0)

Ressources, Plugins & Contributions
-----------------------------------

- [12 factor app](http://12factor.net/)
- [Video sur le 12 factor app d'un membre important de Cakephp](https://www.youtube.com/watch?v=Kye8yaq4jqk)
- Vous pouvez faire une pull request sur [ce dépôt](https://github.com/cakephp-fr/cakephp-fr.github.io/blob/master/_drafts/2015-11-01-newsletter-novembre-2015.md) pour ajouter les articles, plugins qui pourraient intéresser la communauté
pour le mois prochain.


Merci à tous pour l'aide que vous avez pu apporter !


A bientôt et n'hésitez pas à nous contacter sur le
[forum](http://forum.cakephp-fr.org), [github](https://github.com/cakephp-fr), [twitter](https://twitter.com/cakephpfr) ...
