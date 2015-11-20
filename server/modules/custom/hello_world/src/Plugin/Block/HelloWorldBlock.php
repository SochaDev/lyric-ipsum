<?php
/**
 * @file
 * Drupal Module: Hello world
 *
 * A simple hello world example module.
 *
 * @author: Nate Mow <http://drupal.org/user/1564666>
 */

namespace Drupal\hello_world\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Provides a 'Hello' Block
 *
 * @Block(
 *   id = "hello_block",
 *   admin_label = @Translation("Hello block"),
 * )
 */
class HelloWorldBlock extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build() {
    return array(
      '#markup' => $this->t('Hello world!'),
    );
  }

}
