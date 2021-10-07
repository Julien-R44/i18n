/*
 * @adonisjs/i18n
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { ApplicationContract } from '@ioc:Adonis/Core/Application'
import { I18nManager } from '../src/I18nManager'

export default class I18nProvider {
  constructor(protected application: ApplicationContract) {}

  /**
   * Register I18n as a binding to the container
   */
  public register() {
    this.application.container.bind('Adonis/Addons/I18n', () => {
      const emitter = this.application.container.resolveBinding('Adonis/Core/Event')
      const config = this.application.container.resolveBinding('Adonis/Core/Config').get('i18n', {})
      return new I18nManager(this.application, emitter, config)
    })
  }

  /**
   * Register i18n instance to the HTTP context
   */
  public boot() {
    this.application.container.withBindings(
      ['Adonis/Core/HttpContext', 'Adonis/Addons/I18n'],
      (Context, I18n) => {
        Context.getter('i18n', () => I18n.locale(I18n.defaultLocale), true)
      }
    )
  }
}
