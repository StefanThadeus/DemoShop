<?php

namespace Logeecom\DemoShop\App\DataAccess\Models;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

/* Admin class definition, extends Eloquent's ORM Model */
/**
 * @method static Builder where($column, $operator = null, $value = null, $boolean = 'and')
 */
class Admin extends Model
{
    // tells ORM the corresponding table name in the database for this model
    // if not specifically stated, the snake case plural name of the class will be assumed for this role instead
    protected $table = 'Admin';

    // tell ORM not to automatically maintain 'updated_at' and 'created_at' columns in database table
    public $timestamps = false;

    // tell ORM which attributes should be assignable
    protected $fillable = ['token'];
}
