<?php
/**
 * @file
 * Drupal Module: Hello world
 *
 * A simple hello world example module.
 *
 * @author: Nate Mow <http://drupal.org/user/1564666>
 */

namespace Drupal\hello_world\Controller;

use Drupal\Core\Controller\ControllerBase;

class HelloWorldController extends ControllerBase {

  public function content() {
    return array(
      '#type' => 'markup',
      '#markup' => $this->t('Hello, World!'),
    );
  }

  public function tester() {
    return array(
      '#type' => 'markup',
      '#markup' => $this->t('Tester!'),
    );
  }

}
